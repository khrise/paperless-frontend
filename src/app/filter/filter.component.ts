import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { debounce, distinctUntilChanged, debounceTime, filter, startWith, map, concatMap, tap } from 'rxjs/operators';
import { timer, Subject, Observable, concat } from 'rxjs';
import { EventBusService, FilterEvent } from '../event-bus.service';
import { Router, NavigationEnd, NavigationStart } from '@angular/router';
import { DocumentService } from '../document.service';
import { Tag } from '../tag';
import { tagColors } from '../colors';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent {

  thePath: string

  filterFields = [];
  docFilterFields = ["title", "tags__name", "correspondent__name", "content"]
  tagFilterFields = ["name", "slug", "match"]

  filter: any = [];

  colors = tagColors

  showTagSelector: boolean;
  tags: Observable<Tag[]> ;
  tagControl: FormControl;
  showCorrespondentSelector: boolean;

  filterForm: FormGroup;

  @Output()
  onFilterChanged: EventEmitter<any> = new EventEmitter();

  constructor(private fb: FormBuilder,
    private eventBus: EventBusService, 
    private service: DocumentService,
    router: Router) {

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
    this.filter = [];
    this.filterForm = this.fb.group({});
    this.filterFields = [];
    if (this.thePath === "/documents") {
      this.filterFields = this.docFilterFields.slice();
      this.showTagSelector = true;
      this.filterForm.addControl("tagExact", new FormControl(''));
      this.tagControl = new FormControl();
      this.tags = this.tagControl.valueChanges.pipe(
        startWith<string | Tag>(''),
        tap(value => {
          if (value && typeof value !== 'string') {
            this.filterForm.get('tagExact').setValue(value.id);
          } else {
            this.filterForm.get('tagExact').reset();
          }
        }),
        map(value => typeof value === 'string' ? value : value.name),
        distinctUntilChanged(),
        debounceTime(250),
        concatMap((value:string) => this.service.getPage<Tag>("tags", {"name": value}))        
      );
      
      this.showCorrespondentSelector = true;
    } else if (this.thePath === "/tags") {
      this.filterFields = this.tagFilterFields.slice();
    } 

    for (let f of this.filterFields) {
      this.filter.push({field: f, value: ""});
      this.filterForm.addControl(f, new FormControl(''));
    }

    this.filterForm.valueChanges
      .pipe(debounceTime(300))
      .pipe(distinctUntilChanged())
      /*.pipe(filter(elem => JSON.stringify(elem, replaceFunc) !== "{}"))
      .pipe(distinctUntilChanged((a, b) => {
        let sa = JSON.stringify(a, replaceFunc);
        let sb = JSON.stringify(b, replaceFunc);
        return sa === sb;
      }))*/
      .subscribe(
        filter => {
          this.eventBus.publish(new FilterEvent(filter));
          //this.eventBus.publish("SIDE_MENU");
        }
      )
    
  }

  tagDisplayFn = (tag: Tag) => {
    return tag.name;
  }

  clear = () => {
    this.filterForm.reset();
  }

  
  addFilter = (fieldName: string) => {
    this.filter.push({field: fieldName, value: ""});
    this.filterForm.addControl(fieldName, new FormControl());
  }  

  search = () => {
    
  }
}

const replaceFunc = (key, value): boolean => {
  return !!value ? value : undefined

}
