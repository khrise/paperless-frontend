import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { commitHash } from 'src/commit';

@Injectable({
  providedIn: 'root'
})
export class EnvironmentService {

  public static version = environment.version;
  public static commitId = commitHash;

  constructor() { }

  public getBaseUrl = ():string => {
    return "http://192.168.1.31:8000";
  }
}
