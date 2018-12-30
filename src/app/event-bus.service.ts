import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Filter } from './filter/filter';

@Injectable({
  providedIn: 'root'
})
export class EventBusService {

  private subject = new Subject<AppEvent>();

  publish(message: AppEvent | AppEventType) {
    this.subject.next(message instanceof AppEvent ? message : new AppEvent(message));
  }

  clearMessage() {
    this.subject.next();
  }

  on(...types: AppEventType[]): Observable<AppEvent> {
    return this.subject.asObservable().pipe(filter(this.typeFilter(types)));
  }

  typeFilter = (types: AppEventType[]) => {
    return (elem: AppEvent): boolean => {
      return types.indexOf(elem.type) > -1;
    }
  }
}

export class AppEvent {
  constructor(public type: AppEventType) { }
}

export class FilterEvent extends AppEvent {
  constructor(private filter: Filter) {
    super("FILTER");
  }
}

export type AppEventType = "SIDE_MENU" | "FILTER" ;

interface Message {
  channel: AppEventType;
  data: any;
}