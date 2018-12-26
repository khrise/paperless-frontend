import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from './auth.service';
import { MatSidenav } from '@angular/material';
import { EventBusService } from './event-bus.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'paperless-frontend';

  @ViewChild('sidenav') sidenav: MatSidenav;

  constructor(private bus: EventBusService) {
    
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
  }
  toggle = () => {
    this.sidenav.toggle()
  }

}
