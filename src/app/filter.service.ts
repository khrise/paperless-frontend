import { Injectable } from '@angular/core';
import { Filter } from './filter/filter';

@Injectable({
  providedIn: 'root'
})
export class FilterService {
  loadFilter<T>(key: string, filter: T): T {
    let stored = localStorage.getItem("filter_" + key);
      if (stored) {
        stored = JSON.parse(stored);
      }
      Object.assign(filter, stored);
      return filter;
  }

  saveFilter(key: string, f: Filter) {
    localStorage.setItem("filter_" + key, JSON.stringify(f));
  }

  constructor() { }
}
