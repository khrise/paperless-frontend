import { Component, OnInit, OnDestroy } from '@angular/core';
import { DocumentService } from '../document.service';
import { Subscription } from 'rxjs';
import { ListComponent } from '../list/list.component';
import { MatTableDataSource, MatDialog } from '@angular/material';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EnvironmentService } from '../environment.service';
import { EventBusService } from '../event-bus.service';
import { Tag, Matchable } from '../tag';
import { BreakpointObserver } from '@angular/cdk/layout';
import { Router } from '@angular/router';

@Component({
  templateUrl: '../matchable-list/matchable-list.component.html',
  styleUrls: ['./matchable-list.component.scss']
})
export class MatchableListComponent<T extends Matchable> extends ListComponent<T> implements OnInit, OnDestroy {

  displayedColumns = ["name", "slug", "match", "matching_algorithm"];

  list: T[];
  filter;
  sort;

  loading: boolean;
  sub: Subscription;

  filterSub: Subscription;

  constructor(
    apiPath: string,
    service: DocumentService,
    modalService: NgbModal,
    dialog: MatDialog,
    env: EnvironmentService, 
    eventBus: EventBusService,
    breakpointObserver: BreakpointObserver,
    router: Router) {
        super(service, modalService, dialog, env, eventBus, apiPath, breakpointObserver, router);
      this.baseUrl = env.getBaseUrl();
    }

  ngOnInit() {
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
    this.loading = true;
    if (this.sub) {
      this.sub.unsubscribe();
    }
    this.sub = this.service.getPage<T>(this.apiPath, this.filter, this.sort).subscribe(
      result => {
        this.loading = false;
        this.dataSource = new MatTableDataSource(result);
        this.list = result;
      }
    )
  }
 
}
