import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Document } from './document';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {

  constructor(private http: HttpClient) {};

  public getDocuments = (): Observable<Document[]> => {
    let res = this.http.get("http://192.168.1.31:8000/api/documents/", {observe: "response"});
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


