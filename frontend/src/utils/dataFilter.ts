import moment from "moment";
import { IPowerGenerated } from "../interfaces/powerGenerated";

export function filterByHour(data: IPowerGenerated[]): IPowerGenerated[] {
  let lastHour: string | null = null;
  let result: IPowerGenerated[] = [];

  data.forEach((record: IPowerGenerated) => {
    let hour = moment(record.createdAt).format("HH");

    if (hour !== lastHour) {
      result.push(record);
      lastHour = hour;
    }
  });

  return result;
}

export function filterByDay(data: IPowerGenerated[]): IPowerGenerated[] {
  let lastDay: string | null = null;
  let result: IPowerGenerated[] = [];
  let currentRecord: IPowerGenerated | null = null;

  data.forEach((record: IPowerGenerated) => {
    let day = moment(record.createdAt).format("YYYY-MM-DD");

    if (day !== lastDay) {
      if (currentRecord) {
        result.push(currentRecord);
      }
      lastDay = day;
    }
    currentRecord = record;
  });

  // add the last record if it exists
  if (currentRecord) {
    result.push(currentRecord);
  }

  return result;
}

export function filterByMonth(data: IPowerGenerated[]): IPowerGenerated[] {
  let lastDay: string | null = null;
  let result: IPowerGenerated[] = [];
  let currentRecord: IPowerGenerated | null = null;

  data.forEach((record: IPowerGenerated) => {
    let day = moment(record.createdAt).format("YYYY-MM-DD");

    if (day !== lastDay) {
      if (currentRecord) {
        result.push(currentRecord);
      }
      lastDay = day;
    }
    currentRecord = record;
  });

  // add the last record if it exists
  if (currentRecord) {
    result.push(currentRecord);
  }

  return result;
}
