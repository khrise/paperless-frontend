import { Pipe, PipeTransform } from '@angular/core';
import { DocumentService } from './document.service';

@Pipe({
  name: 'resolve'
})
export class ResolvePipe implements PipeTransform {

  constructor(private service: DocumentService) {

  }

  transform(value: any, args?: any): any {
    return this.service.resolveField(value, args);
  }

}
