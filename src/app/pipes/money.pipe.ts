import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'money'
})
export class MoneyPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (value) {
      return Number(value).toLocaleString('en-US')
    } else {
      return '0'
    }
  }

}
