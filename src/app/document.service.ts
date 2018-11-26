import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Document } from './document';
import { EnvironmentService } from './environment.service';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {

  constructor(private http: HttpClient,
    private env: EnvironmentService) {};

  public getDocuments = (filter?): Observable<Document[]> => {
    let params = new HttpParams()
    if (filter) {
      for (let field of Object.keys(filter)) {
        // filter defaults to _contains_
        params = params.append(field + "__contains", filter[field]);
      }
    }
    let res = this.http.get(this.env.getBaseUrl() + "/api/documents/", 
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
    //res.pipe(map(val => val));
    //return res
  }
}


