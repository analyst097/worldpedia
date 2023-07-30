import { Pipe, PipeTransform } from '@angular/core';
import { Currencies } from '../models/models';

@Pipe({
  name: 'currencyname'
})
export class CurrencynamePipe implements PipeTransform {

  transform(value: Currencies, ...args: unknown[]): string[] | null {
    if(value){
      const keys = Object.keys(value);
      const currencyNames: string[] = [];
      keys.forEach(key => {
        currencyNames.push(value[key]?.name);
      });
      return currencyNames;
    }
    return null
    
  }

}
