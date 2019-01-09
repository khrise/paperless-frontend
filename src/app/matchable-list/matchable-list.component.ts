import { Component, OnInit, OnDestroy } from '@angular/core';
import { DocumentService } from '../document.service';
import { Subscription } from 'rxjs';
import { ListComponent } from '../list/list.component';
import { MatDialog } from '@angular/material';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EnvironmentService } from '../environment.service';
import { EventBusService } from '../event-bus.service';
import { Matchable } from '../tag';
import { BreakpointObserver } from '@angular/cdk/layout';
import { Router } from '@angular/router';
import { Page } from '../page';
import { CustomDataSource } from '../paging/custom-data-source';

@Component({
  templateUrl: '../matchable-list/matchable-list.component.html',
  styleUrls: ['./matchable-list.component.scss']
})
export class MatchableListComponent<T extends Matchable> extends ListComponent<T> implements OnInit, OnDestroy {

  page: Page<T>;
  list: T[];
  filter;
  sort;

  loading: boolean;

  filterSub: Subscription;

  apiPath: string = "";

  public displayedColumns = ["name", "slug", "match", "matching_algorithm"];

  constructor(
    
    service: DocumentService,
    modalService: NgbModal,
    dialog: MatDialog,
    env: EnvironmentService, 
    eventBus: EventBusService,
    breakpointObserver: BreakpointObserver,
    router: Router) {
        super(service, modalService, dialog, env, eventBus, breakpointObserver, router);
      this.baseUrl = env.getBaseUrl();
    }

  ngOnInit() {
    this.dataSource = new CustomDataSource(this.service, this.apiPath);
    this.dataSource.loading$.subscribe(l => this.loading = l);
    // mode is hard-coded here
    this.mode = "table";
    this.filterSub = this.eventBus.on("FILTER").subscribe(filterEvent => {
      this.filter = filterEvent['filter'];
      this.fetch();
    })
    this.fetch();
  }

  ngOnDestroy() {
    if (this.filterSub) {
      this.filterSub.unsubscribe();
    }
  }

  fetch = () => {
    this.dataSource.loadEntries(this.filter, this.sort);
  }
 
}
