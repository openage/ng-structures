import { Injectable } from '@angular/core';
import * as _ from 'lodash';
import * as moment from 'moment';

@Injectable()
export class DateService {

  constructor() { }

  parse(param: Date | number | string): Date {
    if (!param) {
      return new Date();
    }
    if (param instanceof Date) {
      return param;
    }
    if (param instanceof Number) {
      return new Date(param);
    }

    if (moment.isMoment(param)) {
      return param.toDate();
    }
    if (param.toLowerCase().indexOf('z', param.length - 1) !== -1) {
      return moment(param).toDate();
    }

    const dateRE = /^\/Date\((-?\d+)(\+|-)?(\d+)?\)\/$/;
    const arr = param && dateRE.exec(param);
    if (arr) {
      return new Date(parseInt(arr[1], 10));
    }

    // dd/mm/yyyy dd-mm-yyyy  formatted
    const parsedDate = new Date();
    parsedDate.setDate(parseInt(param.substr(0, 2), 10));
    parsedDate.setMonth(parseInt(param.substr(3, 2), 10) - 1);
    parsedDate.setFullYear(parseInt(param.substr(6, 4), 10));
    return parsedDate;
  };


  format(format, value: Date): string {
    return moment(value).format(format);
  }

  inMonth(value: Date): Date[] {
    const days: Date[] = [];
    for (let day = 1; day <= moment(value).daysInMonth(); day++) {
      days.push(moment(value).set('date', day).toDate());
    }
    return days;
  }

  inWeek(value: Date): Date[] {
    const days: Date[] = [];
    const start = moment(value).startOf('isoWeek').toDate();
    const end = moment(start).add(7, 'days').toDate();

    for (let day = start; day < end; day = moment(day).add(1, 'days').toDate()) {
      days.push(day);
    }
    return days;
  }

  slots(options: {
    start?: number,
    count?: number,
    step?: number,
    date?: Date
  }, value?: Date): Date[] {
    const slots: Date[] = [];
    value = value || options.date;

    const start = options.start || 8;
    const count = options.count || 9;
    const step = options.step || 1;

    for (let index = 0; index < count; index++) {
      slots.push(moment(value).set('hour', start + step * index)
        .set('minute', 0)
        .set('second', 0).toDate());
    }

    return slots;
  };

  compare(date1: Date, date2: Date, type?: string) {
    type = type || 'date';

    if (type === 'date') {
      return moment(date2).format('DD-MM-YYYY') === moment(date1).format('DD-MM-YYYY');
    } else if (type === 'time') {
      return moment(date2).format('HH:mm') === moment(date1).format('HH:mm');
    }

    return false;
  }
  withinTime(date: any, start: string | number, minutes: number) {
    const fromTime = moment.duration(start);
    const tillTime = moment.duration(start).add(minutes, 'm');
    const time = moment.duration(date);

    return fromTime <= time && time < tillTime;
  }
  setTime(date: Date, time: Date) {
    const newTime = moment(time);
    return moment(date)
      .set('hour', newTime.hour())
      .set('minute', newTime.minute())
      .set('second', newTime.second());
  }
  toString(date: Date, option: string): string {
    switch (option) {
      case 'time':
        return moment(date).format('HH:mm');
      case 'date':
      default:
        return moment(date).format('DD-MM-YYYY');
    }
  }

  toJSON(date: Date): string {
    return moment(date).toJSON();
  }

}
