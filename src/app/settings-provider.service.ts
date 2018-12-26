import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SettingsProviderService {

  settings;

  emitter = new Subject<Settings>()

  constructor() {
    let s = localStorage.getItem("settings");
    if (s) {
      this.settings = JSON.parse(s);
    } else {
      this.settings = {url: '', user: '', password: ''};
    }
  }

  onSettingsChanged = (): Observable<Settings> => {
    return this.emitter.asObservable();
  }

  getSettings = () => {
    return this.settings;
  }

  changeSettings(opts: {url?: string, user?: string, pass?: string}) {
    if (opts.url) 
      this.settings.url = opts.url;
    if (opts.user) 
      this.settings.user = opts.user;
    if (opts.pass) 
      this.settings.password = opts.pass;

    localStorage.setItem("settings", JSON.stringify(this.settings));
    this.emitter.next(this.settings);
  }
}

export class Settings {
  url: string;
  user: string;
  password: string;
}
