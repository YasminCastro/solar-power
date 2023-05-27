export default interface PowerGenerated {
  id: number;
  createdAt: string;
  inversor: number;
  inversorId: number;
  userId: number;
  powerInRealTime: string;
  powerToday: string;
  powerMonth: string;
  powerYear: string;
  allPower: string;
  co2?: string;
  coal?: string;
  tree?: string;
  lat: string;
  long: string;
  localtime: string;
  tempC: number;
  windKph: number;
  pressureIn: number;
  humidity: number;
  cloud: number;
  uv: number;
  precipMM: number;
}
