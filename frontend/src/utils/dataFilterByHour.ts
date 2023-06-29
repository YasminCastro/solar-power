import PowerGenerated from "../interfaces/powerGenerated";

export default function filterByHour(data: PowerGenerated[]): PowerGenerated[] {
  let lastHour: number | null = null;
  let result: PowerGenerated[] = [];

  data.forEach((record: PowerGenerated) => {
    let date: Date = new Date(record.createdAt);
    let hour: number = date.getHours();

    if (hour !== lastHour) {
      result.push(record);
      lastHour = hour;
    }
  });

  return result;
}
