import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDrawer, MatSidenav } from '@angular/material';
import { EventBusService, AppEvent } from '../event-bus.service';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {

  path = '';

  constructor(private router:Router, private activeRoute: ActivatedRoute,
    private eventBus: EventBusService) {
    this.router.url;
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        let e = event as NavigationEnd;
        this.path = e.url;

      }
    })
  }
  ngOnInit() {
    this.activeRoute.params.subscribe(
      value => {
        let a = 0;
      })
  }

  close() {
    this.eventBus.publish("SIDE_MENU");
  }
}
