import { Pipe, PipeTransform } from '@angular/core';
import { Languages } from '../models/models';

@Pipe({
  name: 'languages'
})
export class LanguagesPipe implements PipeTransform {

  transform(value: Languages, ...args: unknown[]): string[] | null {
    if(value && Object.keys(value)){
      return Object.values(value);
    }
    return null;
  }

}
