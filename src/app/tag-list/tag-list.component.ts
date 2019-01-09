import { Component, OnInit, OnDestroy } from '@angular/core';
import { DocumentService } from '../document.service';
import { Subscription } from 'rxjs';
import { ListComponent } from '../list/list.component';
import { MatTableDataSource, MatDialog } from '@angular/material';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EnvironmentService } from '../environment.service';
import { EventBusService } from '../event-bus.service';
import { Tag } from '../tag';
import { BreakpointObserver } from '@angular/cdk/layout';
import { Router } from '@angular/router';
import { MatchableListComponent } from '../matchable-list/matchable-list.component';

@Component({
  selector: 'app-tag-list',
  templateUrl: '../matchable-list/matchable-list.component.html',
  styleUrls: ['./tag-list.component.scss']
})
export class TagListComponent extends MatchableListComponent<Tag> {

  apiPath = "tags";

  constructor(service: DocumentService,
    modalService: NgbModal,
    dialog: MatDialog,
    env: EnvironmentService, 
    eventBus: EventBusService,
    breakpointObserver: BreakpointObserver,
    router: Router) {
      super(service, modalService, dialog, env, eventBus, breakpointObserver, router);
      this.baseUrl = env.getBaseUrl();
    }
}
