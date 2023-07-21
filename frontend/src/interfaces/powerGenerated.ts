export interface IPowerGenerated {
  _id: string;
  createdAt: string;
  inverterId: string;
  userId: string;
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
