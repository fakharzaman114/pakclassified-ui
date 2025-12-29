import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pkrCurrency',
  standalone: true,
})
export class PkrCurrencyPipe implements PipeTransform {
  transform(value: number | null | undefined): string {
    if (value == null) return '';

    if (value >= 10000000) {
      return (value / 10000000).toFixed(2).replace(/\.00$/, '') + ' Crore PKR';
    } else if (value >= 100000) {
      return (value / 100000).toFixed(2).replace(/\.00$/, '') + ' Lac PKR';
    } else {
      return value.toLocaleString('en-PK') + ' PKR';
    }
  }
}
