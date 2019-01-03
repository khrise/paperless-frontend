import { Component, OnInit, QueryList, ViewChildren, OnDestroy } from '@angular/core';
import { DocumentService } from '../document.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PdfPopoverComponent } from '../pdf-popover/pdf-popover.component';
import { EnvironmentService } from '../environment.service';
import { DocumentDetailsComponent } from '../document-details/document-details.component';
import { MatDialog, Sort, MatTableDataSource } from '@angular/material';
import { EventBusService } from '../event-bus.service';
import { DetailsDialogComponent } from '../details-dialog/details-dialog.component';
import { Subscription, of, Observable, forkJoin } from 'rxjs';
import { map, reduce, debounceTime, distinct, distinctUntilChanged } from 'rxjs/operators';
import { MovableBackgroundComponent } from '../movable-background/movable-background.component';
import { ListComponent, MODE} from '../list/list.component';
import { tagColors } from '../colors';
import { BreakpointObserver } from '@angular/cdk/layout';
import { Router } from '@angular/router';
import { FilterService } from '../filter.service';
import { DocumentFilter } from '../filter/filter';


@Component({
  selector: 'app-documentlist',
  templateUrl: './documentlist.component.html',
  styleUrls: ['./documentlist.component.scss']
})
export class DocumentlistComponent extends ListComponent<Document> implements OnInit, OnDestroy {

  @ViewChildren(MovableBackgroundComponent) viewChildren : QueryList<MovableBackgroundComponent>;

  displayedColumns = ["title", "added", "created", "modified", "correspondent__name", "tag_names", "links"];

  colors = tagColors;

  filterSub: Subscription;

  constructor(service: DocumentService,
    modalService: NgbModal,
    dialog: MatDialog,
    env: EnvironmentService, 
    eventBus: EventBusService, 
    breakpointObserver: BreakpointObserver, 
    router: Router,
    private filterService: FilterService) {
      super(service, modalService, dialog, env, eventBus, "documents", breakpointObserver, router);
      this.baseUrl = env.getBaseUrl();
      
    }

  ngOnInit() {
    this.sort = {active: 'created', direction: 'desc'};
    this.filter = this.filterService.loadFilter("documents", new DocumentFilter());
    this.filterSub = this.eventBus.on("FILTER")
        .pipe(distinctUntilChanged())
        .pipe(debounceTime(300))
        .subscribe(filterEvent => {
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

  openPreview = (doc: Document) => {
    /*onst modalRef = this.modalService.open(DocumentDetailsComponent, 
      {backdrop: true, size: 'lg'});
    modalRef.componentInstance.doc = doc;*/
    this.dialog.open(DetailsDialogComponent, {
      width: '90%',
      //height: '70%',
      hasBackdrop: true,
      
      data: { doc: doc, index: this.list.indexOf(doc), documents: this.list}});
    
  }

  resolveField = (url: string, fieldName: string): Observable<any> => {
    if (! url) {
      return of("-")
    }
    return this.service.getMatchable(url)
     .pipe(map((elem) => elem[fieldName]));
  }

  concatResolveField  = (urls: string[], fieldName: string): Observable<any> => {
    if (! urls || urls.length == 0) {
      return of("-")
    }
    return forkJoin(urls.map(elem => this.service.getMatchable(elem)
      .pipe(map((elem) => elem[fieldName]))))
      .pipe(reduce((acc, val) => acc + "," + val));
  }

  zoomIn = (idx: any) => {
    this.viewChildren.filter((item, index: number, array: []) => index === idx)[0].zoomAdd(10);
  }
  
  zoomOut = (idx: number) => {
    this.viewChildren.filter((item, index: number, array: []) => index === idx)[0].zoomAdd(-10);
    
  }

}
