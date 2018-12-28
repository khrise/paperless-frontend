import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd, NavigationStart } from '@angular/router';
import { filter, distinctUntilChanged, map, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  breadcrumbs: Observable<BreadCrumb[]>;

  isNavbarCollapsed = true;

  constructor(private router: Router,
    private activatedRoute: ActivatedRoute) {
      this.breadcrumbs = this.router.events
      .pipe(tap(v => {
        if (v instanceof NavigationStart) {
          this.isNavbarCollapsed = true;
        }
      }))
      .pipe(filter(event => event instanceof NavigationEnd))
      .pipe(distinctUntilChanged())
      .pipe(map(event =>  this.buildBreadCrumb(this.activatedRoute.root)));
  }

  buildBreadCrumb(route: ActivatedRoute, url: string = '', 
                breadcrumbs: BreadCrumb[] = []): BreadCrumb[] {
    //If no routeConfig is avalailable we are on the root path
    
    //let label = route.routeConfig ? route.routeConfig.data ? route.routeConfig.data[ 'breadcrumb' ] : 'Home' : '';
    let label = route.routeConfig ? route.routeConfig.path : 'Home';
    let path = route.routeConfig ? route.routeConfig.path : '';
    
    //In the routeConfig the complete path is not available, 

    let params = route.snapshot.params;
    for (let key of Object.keys(params)) {
      path = path.replace(":" + key, params[key]);
      label = label.replace(":" + key, params[key]);
    }
    
    //so we rebuild it each time
    const nextUrl = `${url}${path}/`;
    const breadcrumb = {
        label: label,
        url: nextUrl
    };
    const newBreadcrumbs = [ ...breadcrumbs, breadcrumb ];
    if (route.firstChild) {
        //If we are not on our current path yet, 
        //there will be more children to look after, to build our breadcumb
        return this.buildBreadCrumb(route.firstChild, nextUrl, newBreadcrumbs);
    }
    return newBreadcrumbs;
}

  ngOnInit() {
  }



}

export interface BreadCrumb {
  label: string;
  url: string;
};
