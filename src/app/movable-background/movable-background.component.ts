import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { EnvironmentService } from '../environment.service';

import * as $ from 'jquery';

class Point {
  constructor(public x: number, public y: number) { }
  equals = (other: Point): boolean => {
    return this.x === other.x && this.y === other.y;
  }
  toString = () => {
    return `point[${this.x}, ${this.y}]`
  }
}

// The code in this class is heavily borrowed from https://codepen.io/denissellu/pen/dXNwRm
@Component({
  selector: 'app-movable-background',
  templateUrl: './movable-background.component.html',
  styleUrls: ['./movable-background.component.scss']
})
export class MovableBackgroundComponent implements OnInit {

  @Input()
  url: string;

  
  _enabled: boolean = false;
  
  @ViewChild('child') child;

  debug: boolean = false;

  baseUrl: string;

  

  constructor(env: EnvironmentService) {
    this.baseUrl = env.getBaseUrl();
  }

  ngOnInit() {
    this.context = $(this.child.nativeElement);
    this.patternBackground = $('.pattern-background-image', this.context)
    this.imageContainer = $('.outer-container', this.context)

    this.enable(this.enabled)
    
    //$('.range-slider input', this.context ).on("input", this.zoomEvent);
    this.zoomChange(this.zoomLevel);
  }

  @Input()
  public set enabled(v: boolean) {
    let changed = this.enabled !== v;
    this._enabled = v;
    if (changed) {
      this.enable(this.enabled);
    }
   
  }

  public get enabled() {
    return this._enabled;
  }

  private enable(v: boolean) {
    if (! this.patternBackground) {
      return;
    }
    if (v) {
      this.patternBackground.on("mousedown touchstart", this.mouseDownTouchStart);
    } else {
      this.patternBackground.off("mousedown touchstart");
    }
  } 
  
  zoomLevel: number = 100;

  context;

  mousedown: Point;
  elepos: Point;

  patternBackgroundWidth: number
  patternBackgroundHeight: number
  patternBackground;
  imageContainer;


  zoomChange = (val) => {
    this.zoomLevel = val;
    this.patternBackground.css(
      'background-size', "" + this.zoomLevel + "%");
  }

  minZoom = 30;
  maxZoom = 200;

  zoomAdd = (val) => {
    let newVal = this.zoomLevel += val;
    if (newVal < this.minZoom) {
      return;
    }
    if (newVal > this.maxZoom) {
      return;
    }
    this.zoomChange(newVal);
  }

  mouseDownTouchStart = (e: any) => {
    e.preventDefault()
    this.patternBackgroundWidth = this.patternBackground.width()
    this.patternBackgroundHeight = this.patternBackground.height()
    this.fixMouseDown(new Point(e.originalEvent.pageX || e.originalEvent.touches[0].pageX,
      e.originalEvent.pageY || e.originalEvent.touches[0].pageY));

    this.elepos = new Point(parseFloat(this.patternBackground.css("backgroundPosition").split(" ")[0].replace('px', '')),
      parseFloat(this.patternBackground.css("backgroundPosition").split(" ")[1].replace('%', '')));
    $(document).on('mousemove touchmove', this.mouseMove_touchMove);
    $(document).on('mouseup touchend', this.mouseUp_TouchEnd);
  }

  fixMouseDown = (p: Point) => {
    this.elepos = new Point(parseFloat(this.patternBackground.css("backgroundPosition").split(" ")[0].replace('px', '')),
      parseFloat(this.patternBackground.css("backgroundPosition").split(" ")[1].replace('px', '')));
    this.mousedown = p;
  }

  mouseUp_TouchEnd = (e) => {
    $(document).off('mousemove touchmove')
    this.mousedown = null;
  }

  private mousepos: Point;

  newBgPos;
  mouseMove_touchMove = (e) => {

    this.mousepos = new Point(
      e.originalEvent.pageX || e.originalEvent.changedTouches[0].pageX || this.mousedown.x,
      e.originalEvent.pageY || e.originalEvent.changedTouches[0].pageY || this.mousedown.y);

    if (!this.mousedown.equals(this.mousepos)) {
      let actualMove = new Point(
        this.mousepos.x - this.mousedown.x,
        this.mousepos.y - this.mousedown.y
      );
      let newPos = new Point(this.elepos.x + actualMove.x,
        this.elepos.y + actualMove.y);

      /*if (newPos.x < 0) {
        this.fixMouseDown(this.mousepos);
        newPos.x = 0;
        return
      }
      if (newPos.x > this.patternBackgroundWidth - 20) {
        this.fixMouseDown(this.mousepos);
        newPos.x = this.patternBackgroundWidth - 20;
      }
      if (newPos.y < 0) {
        this.fixMouseDown(this.mousepos);
        newPos.y = 0;
      }
      if (newPos.y > this.patternBackgroundHeight - 20) {
        this.fixMouseDown(this.mousepos);
        newPos.y = this.patternBackgroundHeight - 20;
      }*/
      this.newBgPos = `${newPos.x}px ${newPos.y}px`;
      this.patternBackground.css('background-position',
        this.newBgPos)
    }
  }



}


