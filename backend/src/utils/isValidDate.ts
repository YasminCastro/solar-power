import moment from 'moment';

export function isValidDateDay(date: string) {
  return moment(date, 'DD-MM-YYYY', true).isValid();
}

export function isValidDateMonth(date: string) {
  return moment(date, 'MM-YYYY', true).isValid();
}

export function isValidDateYear(date: string) {
  return moment(date, 'YYYY', true).isValid();
}
