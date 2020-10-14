import { Pipe, PipeTransform } from '@angular/core';
import { e } from '@angular/core/src/render3';

@Pipe({
  name: 'toFixed'
})
export class ToFixedPipe implements PipeTransform {

  transform(value: string, args?: any): any {
    if (value !== '--' && value !== '' && value !== '-') {
      const firstNum = args.substr(0, 1);
      if (firstNum === '6' || firstNum === '3' || firstNum === '0') {
        return (Math.round(parseFloat(value) * 100) / 100).toFixed(2);
      } else {
        return (Math.round(parseFloat(value) * 1000) / 1000).toFixed(3);
      }

    } else {
      return value;
    }
  }

}
