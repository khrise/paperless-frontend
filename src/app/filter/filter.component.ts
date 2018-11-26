import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { debounce, distinctUntilChanged, debounceTime } from 'rxjs/operators';
import { timer, Subject } from 'rxjs';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {

  filterFields = ["title", "tag", "content"]

  filter: any = [];

  filterForm: FormGroup;

  @Output()
  onFilterChanged: EventEmitter<any> = new EventEmitter();

  constructor(private fb: FormBuilder) {
    this.filterForm = this.fb.group({});

    this.filterForm.valueChanges
      .pipe(debounceTime(300))
      .pipe(distinctUntilChanged((a, b) => {
        let sa = JSON.stringify(a, (key, value) => !!value ? value : undefined);
        let sb = JSON.stringify(b, (key, value) => !!value ? value : undefined);
        return sa === sb;
      }))
      .subscribe(
        filter => {
          this.onFilterChanged.emit(filter);
        }
      )
  }

  ngOnInit() {
    //this.filter.push({field: "title", value: "Heppa"});
  }

  
  addFilter = (fieldName: string) => {
    this.filter.push({field: fieldName, value: ""});
    this.filterForm.addControl(fieldName, new FormControl());
  }  
}
