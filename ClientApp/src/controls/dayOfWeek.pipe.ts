import {Pipe} from '@angular/core';
import {DayOfWeek} from "@js-joda/core";

const daysIntlFr = new Map<DayOfWeek, string>([
  [DayOfWeek.MONDAY, 'lundi'],
  [DayOfWeek.TUESDAY, 'mardi'],
  [DayOfWeek.WEDNESDAY, 'mercredi'],
  [DayOfWeek.THURSDAY, 'jeudi'],
  [DayOfWeek.FRIDAY, 'vendredi'],
  [DayOfWeek.SATURDAY, 'samedi'],
  [DayOfWeek.SUNDAY, 'dimanche']
]);

@Pipe({
  name: 'dayOfWeek'
})
export class DayOfWeekPipe {
  transform(value: DayOfWeek): string {

    if (!value) {
      return '';
    }

    return daysIntlFr.get(value);
  }
}
