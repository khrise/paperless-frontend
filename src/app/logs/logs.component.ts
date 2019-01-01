import { Component, OnInit } from '@angular/core';
import { DocumentService } from '../document.service';
import { LogEntry } from './log';
import { Filter } from '../filter/filter';
import { Sort } from '@angular/material/sort';
import { Observable, Subscription } from 'rxjs';
import { PageEvent, MatDialog } from '@angular/material';
import { map, tap } from 'rxjs/operators';
import { Page } from '../page';
import { CustomDataSource } from '../paging/custom-data-source';
import { ListComponent } from '../list/list.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EnvironmentService } from '../environment.service';
import { EventBusService } from '../event-bus.service';
import { BreakpointObserver } from '@angular/cdk/layout';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logs',
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.scss']
})
export class LogsComponent extends ListComponent<LogEntry>  implements OnInit {
  
  displayedColumns = ["time", "messages"]

  dataSource: CustomDataSource<LogEntry>

  filter: Filter;
  sort: Sort;
  loading: boolean;
  filterSub: Subscription;

  constructor(service: DocumentService,
    modalService: NgbModal,
    dialog: MatDialog,
    env: EnvironmentService, 
    eventBus: EventBusService,
    breakpointObserver: BreakpointObserver,
    router: Router) {
      super(service, modalService, dialog, env, eventBus, "logs", breakpointObserver, router);
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
