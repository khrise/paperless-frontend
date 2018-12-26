import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Observable, of, forkJoin } from 'rxjs';
import { map, shareReplay, reduce } from 'rxjs/operators';
import { Document } from './document';
import { EnvironmentService } from './environment.service';
import { Sort } from '@angular/material/sort';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {

  private correspondentCache: { [key: string]: Observable<any> } = {};
  
  getCorrespondent = (url: string): Observable<any> => {
    this.correspondentCache[url] = this.correspondentCache[url] || this.http.get(url).pipe(shareReplay(1));
    return this.correspondentCache[url];
    
  }
  
  private tagCache: { [key: string]: Observable<any> } = {};
  getTag = (url: string): Observable<any> => {
    this.tagCache[url] = this.tagCache[url] || this.http.get(url).pipe(shareReplay(1));
    return this.tagCache[url];
    
  }
  
  update = (id: number, value: { field: any; }): Observable<Document> => {
    return this.http.put(this.env.getBaseUrl() + "/api/documents/" + id + "/", value, {observe: 'response'})
    .pipe(map((res: HttpResponse<any>) => res.status === 200 ? res.body : null));
  }

  constructor(private http: HttpClient,
    private env: EnvironmentService) {};

  public getDocuments = (filter?, sort?: Sort): Observable<Document[]> => {
    return this.getPage<Document>("documents", filter, sort)
  }

  public getPage<T>(path, filter?, sort?: Sort): Observable<T[]> {
    let params = this.buildFilter(filter)
    params = this.applySorting(sort, params)
    let res = this.http.get(`${this.env.getBaseUrl()}/api/${path}/`, 
      {observe: "response", params: params});
    return res.pipe(map(
      result => {
        return result.body['results'] as T[]
      },
      error => {
        if (error.status && error.status === 403) {
          console.log("Auth error");
        }
        throw new Error('auth')
      }
    ))
  }

  applySorting = (sort: Sort, params?: HttpParams): HttpParams => {
    if (! params) {
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
  

  private buildFilter = (filter, params?: HttpParams) => {
    if (! params) {
      params = new HttpParams()
    }
    if (filter) {
      for (let field of Object.keys(filter)) {
        if (filter[field] == null || filter[field] === "") {
          continue;
        }
        // filter defaults to _icontains_
        params = params.append(field + "__icontains", filter[field]);
      }
    }
    return params;
  }

  public getDocument(id: any): Observable<Document> {
    return this.getSingleEntry('documents', id)
  }

  public getSingleEntry = (entity, id): Observable<any> => {
    let res = this.http.get(`${this.env.getBaseUrl()}/api/${entity}/${id}/`, 
      {observe: "response"});
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
    if (! url) {
      return of("-")
    }
    return this.getCorrespondent(url)
     .pipe(map((elem) => fieldName ? elem[fieldName] : elem));
  }

  public concatResolveField  = (urls: string[], fieldName: string): Observable<any> => {
    if (! urls || urls.length == 0) {
      return of("-")
    }
    return forkJoin(urls.map(elem => this.getTag(elem)
      .pipe(map((elem) => elem[fieldName]))))
      .pipe(reduce((acc, val) => acc + "," + val));
  }

}


