import { Component, OnInit, ChangeDetectorRef, ChangeDetectionStrategy, Input } from '@angular/core';
import {Document} from '../document';

@Component({
  selector: 'app-raw-text',
  templateUrl: './raw-text.component.html',
  styleUrls: ['./raw-text.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RawTextComponent implements OnInit {

  mode: MODES = "wrap";
  @Input()
  doc: Document;

  constructor(private cd: ChangeDetectorRef) { }

  ngOnInit() {
  }

  switchMode = (mode: MODES) => {
    this.mode = mode;
    this.cd.detectChanges();
  }
  

}


type MODES = "pre" | "wrap"