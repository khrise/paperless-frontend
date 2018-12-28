import { Component, OnInit, ViewChild, AfterContentInit } from '@angular/core';
import { AuthService } from './auth.service';
import { MatSidenav } from '@angular/material';
import { EventBusService } from './event-bus.service';
import * as $ from 'jquery';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterContentInit{
  title = 'paperless-frontend';

  hasBackdrop = false;
  mode = "push";

  @ViewChild('sidenav') sidenav: MatSidenav;

  constructor(private bus: EventBusService,
    private breakpointObserver: BreakpointObserver) {
    
  }

  ngAfterContentInit() {
    let h = $("div.fixed-top").height();
    let target = $("div.push")
    target.css('height', h);
  }

  ngOnInit() {
    //this.sidenav.close();
    this.bus.on("SIDE_MENU").subscribe(
      event => {
        this.sidenav.toggle().then(result => {
          let a = result;
        });
      }
    );
    this.breakpointObserver
      .observe([Breakpoints.Handset])            
      .subscribe((state: BreakpointState) => {
          if (state.matches) {
              this.mode = "over";
              this.hasBackdrop = true;
          } else {
              this.mode = "push";
              this.hasBackdrop = false;
          }
      });
    
  }
  toggle = () => {
    this.sidenav.toggle()
  }

}
