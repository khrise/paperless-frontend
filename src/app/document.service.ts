import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Document } from './document';
import { EnvironmentService } from './environment.service';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  update = (id: number, value: { field: any; }): Observable<Document> => {
    return this.http.put(this.env.getBaseUrl() + "/api/documents/" + id + "/", value, {observe: 'response'})
    .pipe(map((res: HttpResponse<any>) => res.status === 200 ? res.body : null));
  }

  constructor(private http: HttpClient,
    private env: EnvironmentService) {};

  public getDocuments = (filter?): Observable<Document[]> => {
    return this.getPage("documents", filter)
  }

  public getPage = (entity, filter?) => {
    let params = this.buildFilter(filter)
    let res = this.http.get(`${this.env.getBaseUrl()}/api/${entity}/`, 
      {observe: "response", params: params});
    return res.pipe(map(
      result => {
        return result.body['results'] as Document[]
      },
      error => {
        if (error.status && error.status === 403) {
          console.log("Auth error");
        }
        throw new Error('auth')
      }
    ))
  }

  private buildFilter = (filter, params?: HttpParams) => {
    if (! params) {
      params = new HttpParams()
    }
    if (filter) {
      for (let field of Object.keys(filter)) {
        // filter defaults to _contains_
        params = params.append(field + "__contains", filter[field]);
      }
    }
    return params;
  }
}


