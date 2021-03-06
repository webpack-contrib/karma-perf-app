import { Pipe, PipeTransform } from '@angular/core';
import {
  isString,
  isBoolean,
  isUndefined,
  isFiniteNumber,
  extractDeepPropertyByMapKey,
} from '../../utils/pipe-utils';

@Pipe({
  name: 'filterBy'
})
export class FilterByPipe implements PipeTransform {

  transform(input: any, props: Array<string>, search: any = '', strict: boolean = false): any[] {
    if (!Array.isArray(input) || (!isString(search) && !isFiniteNumber(search) && !isBoolean(search))) {
      return input;
    }

    const term = String(search).toLowerCase();

    return input.filter((obj) => {
      return props.some((prop) => {
        const value = extractDeepPropertyByMapKey(obj, prop),
          strValue: string = String(value).toLowerCase();

        if (isUndefined(value)) {
          return false;
        }

        return strict ? term === strValue : !!~strValue.indexOf(term);
      });
    });
  }

}
