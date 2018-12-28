import { DocumentService } from "../document.service";

import { NgbModal } from "@ng-bootstrap/ng-bootstrap";

import { MatDialog, MatTableDataSource, Sort } from "@angular/material";

import { EnvironmentService } from "../environment.service";

import { EventBusService } from "../event-bus.service";
import { Subscription } from "rxjs";
import { BreakpointObserver, Breakpoints, BreakpointState } from "@angular/cdk/layout";
import { Router } from "@angular/router";

export class ListComponent<T> {

    config: any

    list: T[]
    dataSource: MatTableDataSource<any>

    baseUrl: string;
    loading: boolean;

    filter: any;
    sort: Sort;
    sub: Subscription;

    // the number of columns in grid view
    cols = 4;
    rowHeight = 250;

    constructor(protected service: DocumentService,
        protected modalService: NgbModal,
        protected dialog: MatDialog,
        protected env: EnvironmentService,
        protected eventBus: EventBusService,
        protected apiPath: String,
        protected breakpointObserver: BreakpointObserver, 
        public router: Router) {
        this.readConfig();

        this.breakpointObserver
            .observe([Breakpoints.Handset])            
            .subscribe((state: BreakpointState) => {
                if (state.matches) {
                    this.cols = 1;
                } else {
                    this.cols = 4;
                }
            });
    }

    readConfig = () => {
        let r = localStorage.getItem("config_" + this.apiPath);
        if (r)
            this.config = JSON.parse(r);

        if (!this.config) {
            this.config = this.getDefaultConfig();
        }
    }

    writeConfig = () => {
        localStorage.setItem("config_" + this.apiPath, JSON.stringify(this.config));
    }

    getDefaultConfig = () => {
        return { mode: 'table' };
    }

    get mode() {
        return this.config['mode'] || "table";
    }

    set mode(mode: MODE) {
        this.config['mode'] = mode;
    }


    menuToggle = () => {
        this.eventBus.publish("SIDE_MENU")
    }

    fetch = () => {
        this.loading = true;
        if (this.sub) {
            this.sub.unsubscribe();
        }
        this.sub = this.service.getPage<T>(this.apiPath, this.filter, this.sort).subscribe(
            result => {
                this.dataSource = new MatTableDataSource(result);
                this.list = result;
                this.loading = false;
            }
        )
    }

    sortData(sort: Sort) {
        if (!sort.active || sort.direction === '') {
            return;
        }
        this.sort = sort;

        this.fetch()
    }


    toggleMode(m?: MODE) {
        if (m) {
            this.mode = m;
        } else {
            if (this.mode == "tiles")
                this.mode = "table";
            else if (this.mode == "table")
                this.mode = "tiles";
        }
        this.writeConfig();
    }



}

export type MODE = "tiles" | "table"