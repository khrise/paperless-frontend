import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient: HttpClient) {
    
  }

  public login = (username: string, password: string) => {
    this.httpClient.post("http://localhost:8000/api/auth/login/", {username: username, password: password}).subscribe(
      result => {
        console.log('success');
      },
      error => {
        console.log('failed' + error)
      } 

    )
  }
}
