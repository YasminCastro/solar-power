import moment from "moment";
import PowerGenerated from "../interfaces/powerGenerated";

export function filterByHour(data: PowerGenerated[]): PowerGenerated[] {
  let lastHour: string | null = null;
  let result: PowerGenerated[] = [];

  data.forEach((record: PowerGenerated) => {
    let hour = moment(record.localtime, "YYYY-MM-DD HH:mm").format("HH");

    if (hour !== lastHour) {
      result.push(record);
      lastHour = hour;
    }
  });

  return result;
}

export function filterByDay(data: PowerGenerated[]): PowerGenerated[] {
  let lastDay: string | null = null;
  let result: PowerGenerated[] = [];
  let currentRecord: PowerGenerated | null = null;

  data.forEach((record: PowerGenerated) => {
    let day = moment(record.localtime, "YYYY-MM-DD HH:mm").format("YYYY-MM-DD");

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
