import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Observable, of, forkJoin } from 'rxjs';
import { map, shareReplay, reduce, catchError } from 'rxjs/operators';
import { Document } from './document';
import { EnvironmentService } from './environment.service';
import { Sort } from '@angular/material/sort';
import { Filter } from './filter/filter';
import { Page } from './page';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {

  private cache: { [key: string]: Observable<any> } = {};

  getMatchable = (url: string): Observable<any> => {
    this.cache[url] = this.cache[url] || this.http.get(url).pipe(shareReplay(1));
    return this.cache[url];

  }

  update = (id: number, value: { field: any; }): Observable<Document> => {
    return this.http.put(this.env.getBaseUrl() + "/api/documents/" + id + "/", value, { observe: 'response' })
      .pipe(map((res: HttpResponse<any>) => res.status === 200 ? res.body : null));
  }

  constructor(private http: HttpClient,
    private env: EnvironmentService) { };

  public getDocuments = (filter?, sort?: Sort): Observable<Page<Document>> => {
    return this.getPage<Document>("documents", filter, sort)
  }

  public getPage<T>(path, filter?: Filter, sort?: Sort, pageIndex?: number, pageSize = 25): Observable<Page<T>> {
    let params = this.buildFilter(filter)
    params = this.applySorting(sort, params)
    if (pageIndex && pageIndex > 1) {
      params = params.set("page", pageIndex.toString())
    }
    params = params.set("page-size", String(pageSize));
    let res = this.http.get(`${this.env.getBaseUrl()}/api/${path}/`,
      { observe: "response", params: params });
    return res
      .pipe(catchError(error => {
        if (error.status && error.status === 403) {
          console.log("Auth error");
        } else {
          console.log("Encountered error " + (error.message ? error.message : "no message given"));
        }
        throw new Error('auth')
      }))
      .pipe(map(
        result => {
          return result.body as Page<T>
        }
      ))
  }

  applySorting = (sort: Sort, params?: HttpParams): HttpParams => {
    if (!params) {
      params = new HttpParams()
    }
    if (!sort) {
      return params;
    }
    if (sort.active) {
      let v = sort.active;
      if (sort.direction === "desc") {
        v = "-" + v
      }
      params = params.append("ordering", v);
    }
    return params
  }


  private buildFilter = (filter: Filter, params?: HttpParams) => {
    if (!params) {
      params = new HttpParams()
    }
    if (filter) {
      /* for (let field of Object.keys(filter)) {
        if (field === 'fieldFilters') {
          continue;
        }
        if (filter[field] == null || filter[field] === "") {
          continue;
        }
        params = params.append(field, filter[field]);
      } */
      for (let field of filter.fieldFilters) {
        if (field.value == null || field.value === "") {
          continue;
        }
        params = params.append(field.key, String(field.value));
      }
    }
    return params;
  }

  public getDocument(id: any): Observable<Document> {
    return this.getSingleEntry('documents', id)
  }

  public getSingleEntry = (entity, id): Observable<any> => {
    let res = this.http.get(`${this.env.getBaseUrl()}/api/${entity}/${id}/`,
      { observe: "response" });
    return res.pipe(map(
      result => {
        return result.body
      },
      error => {
        if (error.status && error.status === 403) {
          console.log("Auth error");
        }
        throw new Error('auth')
      }
    ))
  }

  public resolveField = (url: string, fieldName: string): Observable<any> => {
    if (!url) {
      return of("-")
    }
    return this.getMatchable(url)
      .pipe(map((elem) => fieldName ? elem[fieldName] : elem));
  }

  public concatResolveField = (urls: string[], fieldName: string): Observable<any> => {
    if (!urls || urls.length == 0) {
      return of("-")
    }
    return forkJoin(urls.map(elem => this.getMatchable(elem)
      .pipe(map((elem) => elem[fieldName]))))
      .pipe(reduce((acc, val) => acc + "," + val));
  }

}


