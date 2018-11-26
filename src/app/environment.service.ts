import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EnvironmentService {

  constructor() { }

  public getBaseUrl = ():string => {
    return "http://192.168.1.31:8000";
  }
}
