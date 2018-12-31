import { Component, OnInit } from '@angular/core';
import { MatchableListComponent } from '../matchable-list/matchable-list.component';
import { Correspondent } from '../tag';
import { DocumentService } from '../document.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MatDialog } from '@angular/material';
import { EnvironmentService } from '../environment.service';
import { EventBusService } from '../event-bus.service';
import { BreakpointObserver } from '@angular/cdk/layout';
import { Router } from '@angular/router';

@Component({
  selector: 'app-correspondent-list',
  templateUrl: '../matchable-list/matchable-list.component.html',
  styleUrls: ['./correspondent-list.component.scss']
})
export class CorrespondentListComponent extends MatchableListComponent<Correspondent> {

  constructor(service: DocumentService,
    modalService: NgbModal,
    dialog: MatDialog,
    env: EnvironmentService, 
    eventBus: EventBusService,
    breakpointObserver: BreakpointObserver,
    router: Router) {
      super("correspondents", service, modalService, dialog, env, eventBus, breakpointObserver, router);
      this.baseUrl = env.getBaseUrl();
    }


}
