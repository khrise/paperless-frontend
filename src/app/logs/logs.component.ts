import { Component, OnInit } from '@angular/core';
import { DocumentService } from '../document.service';
import { LogEntry } from './log';
import { Filter } from '../filter/filter';
import { Sort } from '@angular/material/sort';
import { Observable } from 'rxjs';
import { MatTableDataSource } from '@angular/material';
import { tap } from 'rxjs/internal/operators/tap';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-logs',
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.scss']
})
export class LogsComponent implements OnInit {

  dataSource: MatTableDataSource<LogEntry>
  list: Observable<LogEntry[]>;

  filter: Filter;
  sort: Sort;

  constructor(private service: DocumentService) { }

  ngOnInit() {
    this.filter = new Filter();
    new MatTableDataSource();

    this.list = this.service.getPage<LogEntry>('logs', this.filter, this.sort)
    .pipe(tap(res => this.dataSource = new MatTableDataSource(res)))
  }

}
