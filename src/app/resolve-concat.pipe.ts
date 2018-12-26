import { Pipe, PipeTransform } from '@angular/core';
import { DocumentService } from './document.service';

@Pipe({
  name: 'resolveConcat'
})
export class ResolveConcatPipe implements PipeTransform {

  constructor(private service: DocumentService) {

  }

  transform(value: any, args?: any): any {
    return this.service.concatResolveField(value, args);
  }



}
