import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SettingsProviderService, Settings } from './settings-provider.service';

@Injectable()
export class BasicAuthInterceptor implements HttpInterceptor {
    authdata: string

    constructor(settingsProvider: SettingsProviderService) {
        this.loadAuthFromSettings(settingsProvider.getSettings());
        settingsProvider.onSettingsChanged().subscribe(
            value => {
                this.loadAuthFromSettings(value);
            }
        )
    }

    loadAuthFromSettings = (s: Settings) => {
        this.authdata = window.btoa(s.user + ':' + s.password);
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add authorization header with basic auth credentials if available
        //let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (! request.headers.has("Authorization")) {
            request = request.clone({
                setHeaders: { 
                    Authorization: `Basic ${this.authdata}`
                }
            });
        }
        

        return next.handle(request);
    }
}