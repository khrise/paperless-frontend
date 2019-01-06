import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { debounce, distinctUntilChanged, debounceTime, filter, startWith, map, concatMap, tap } from 'rxjs/operators';
import { timer, Subject, Observable, concat } from 'rxjs';
import { EventBusService, FilterEvent } from '../event-bus.service';
import { Router, NavigationEnd, NavigationStart } from '@angular/router';
import { DocumentService } from '../document.service';
import { Tag } from '../tag';
import { tagColors } from '../colors';
import { Filter, DocumentFilter, MatchableFilter, LogFilter, ltFilter, gtFilter, gteFilter, lteFilter, eqFilter, idFilter } from './filter';
import { FilterService } from '../filter.service';
import * as moment from "moment";

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent {

  thePath: string

  filter: Filter;
  prefix: string;

  colors = tagColors

  showTagsSection: boolean;
  showTagSelector: boolean;
  tags: Observable<Tag[]>;
  tagControl: FormControl;
  showCorrespondentSelector: boolean;

  filterForm: FormGroup;

  @Output()
  onFilterChanged: EventEmitter<any> = new EventEmitter();

  constructor(private fb: FormBuilder,
    private eventBus: EventBusService,
    private service: DocumentService,
    router: Router,
    private filterService: FilterService) {

    this.initFromPath();

    router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        //this.close();
      }
      if (event instanceof NavigationEnd) {
        let e = event as NavigationEnd;
        this.thePath = e.url;
        this.initFromPath();
      }
    })
  }

  initFromPath() {
    this.filter = new Filter();
    this.filterForm = this.fb.group({});
    if (this.thePath === "/documents") {
      this.prefix = "documents";
      this.filter = this.filterService.loadFilter(this.prefix, new DocumentFilter());

      this.showTagSelector = true;
      this.showTagsSection = true;
      this.filterForm.addControl("tag_exact", new FormControl(''));

      this.tagControl = new FormControl();
      this.tags = this.tagControl.valueChanges.pipe(
        startWith<string | Tag>(''),
        tap(value => {
          if (value && typeof value !== 'string') {
            (this.filter as DocumentFilter).tagIds.push(value.id);
          } else {
            //this.filterForm.get('tag_exact').reset();
          }
        }),
        map(value => typeof value === 'string' ? value : value.name),
        distinctUntilChanged(),
        debounceTime(250),
        concatMap((value: string) => this.service.getPage<Tag>("tags", new MatchableFilter(value))
          .pipe(map(elem => elem.results)))  //map the resulting age directly to the contained results       
      );

      this.showCorrespondentSelector = true;
    } else if (this.thePath === "/tags") {
      this.prefix = "tags";
      this.filter = this.filterService.loadFilter(this.prefix, new MatchableFilter());
      this.showTagSelector = false;
      this.showTagsSection = false;
    } else if (this.thePath === "/correspondents") {
      this.prefix = "correspondents";
      this.filter = this.filterService.loadFilter(this.prefix, new MatchableFilter());
      this.showTagSelector = false;
      this.showTagsSection = false;
    } else if (this.thePath === "/logs") {
      this.prefix = "logs";
      this.filter = this.filterService.loadFilter(this.prefix, new LogFilter());
      this.showTagSelector = false;
      this.showTagsSection = false;
    }


    for (let f of this.filter.fieldFilters) {
      this.filterForm.addControl(f.field, new FormControl(f.value));
    }

    this.filterForm.valueChanges
      .pipe(debounceTime(300))
      .pipe(distinctUntilChanged())
      .subscribe(
        filter => {
          this.mergeAndPublish(filter);
        }
      )

  }

  mergeAndPublish(filter: any) {
    for (let field of Object.keys(filter)) {
      let target = this.filter.fieldFilters.find(elem => elem.field === field);
      if (target) {
        target.value = filter[field];
      }
    }
    this.publish()
  }

  publish = () => {
    this.filterService.saveFilter(this.prefix, this.filter);
    this.eventBus.publish(new FilterEvent(this.filter));
  }

  tagDisplayFn = (tag: string | Tag): string => {
    if (!tag) {
      return '';
    }
    return typeof tag === 'string' ? tag.substring(tag.lastIndexOf('/')) : tag.name;
  }

  clear = () => {
    this.filter.reset();
    delete this.filter['ranges'];
    delete this.filter["tags__id"]
    this.filterForm.reset();
  }

  search = () => {

  }

  filterTimestamp(targetField: string, range: timestampRange) {
    // remove all date filters for the given target field
    this.filter.fieldFilters = this.filter.fieldFilters.slice()
      .filter(elem => (elem.field !== targetField));

    let ranges = this.filter['ranges'] || {};
    if (range) {
      let from = moment.utc().startOf(range);
      let to = moment.utc().endOf(range);
      this.filter.fieldFilters.push(gteFilter(targetField, from.format()));
      this.filter['ranges'] = ranges;
      this.filter.fieldFilters.push(lteFilter(targetField, to.format()));
      ranges[targetField] = range;
    } else {
      delete this.filter['ranges'];
    }

    this.publish();
  }

  addTag(id) {
    let fieldName = "tags__id"
    this.filter.fieldFilters = this.filter.fieldFilters
      .filter(elem => (elem.field !== fieldName));
    if (id) {
      this.filter.fieldFilters.push(idFilter(fieldName, String(id)));
      this.filter.addCustomField(fieldName, id);
    } else {
      this.filter.removeCustomField(fieldName);
    }
    this.publish();
  }
}

type timestampRange = "day" | "week" | "month" | "year";

const replaceFunc = (key, value): boolean => {
  return !!value ? value : undefined

}
