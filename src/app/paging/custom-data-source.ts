
import {CollectionViewer, DataSource} from "@angular/cdk/collections";
import { BehaviorSubject, Observable, of } from "rxjs";
import { DocumentService } from "../document.service";
import { Filter } from "../filter/filter";
import { Sort } from "@angular/material/sort";
import { catchError, finalize } from "rxjs/operators";
import { Page } from "../page";

export class CustomDataSource<T> implements DataSource<T> {

    private subject = new BehaviorSubject<T[]>([]);
    private loadingSubject = new BehaviorSubject<boolean>(false);

    public loading$ = this.loadingSubject.asObservable();

    public count: number;


    constructor(private service: DocumentService, private apiPath: string) {}

    connect(collectionViewer: CollectionViewer): Observable<T[]> {
        return this.subject.asObservable();
    }   

    disconnect(collectionViewer: CollectionViewer): void {
        this.subject.complete();
        this.loadingSubject.complete();
    }
  
    loadEntries(filter: Filter, sort: Sort, pageIndex = 0) {
            this.loadingSubject.next(true);
            this.service.getPage<T>(this.apiPath, filter, sort, pageIndex + 1).pipe(
                catchError(() => of(new Page<T>())),
                finalize(() => {
                    this.loadingSubject.next(false)
                })
            )
            .subscribe(
                (page) => {
                    this.count = page.count;
                    this.subject.next(page.results);
                });
    }  
}
  