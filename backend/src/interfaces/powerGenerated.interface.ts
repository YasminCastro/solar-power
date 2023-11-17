export interface HauweiDataInterface {
  powerInRealTime: number;
  powerToday: number;
  powerMonth: number;
  powerYear: number;
  allPower: number;
  co2: string;
  coal: string;
  tree: string;
}

export interface ElginDataInterface {
  powerInRealTime?: number;
  powerToday: number;
  powerMonth: number;
  powerYear: number;
  allPower: number;
  co2: string;
}

export interface WeatherInterface {
  localtime: string;
  tempC: number;
  windKph: number;
  pressureIn: number;
  humidity: number;
  cloud: number;
  uv: number;
  precipMM: number;
}

export interface PowerGenerated {
  _id?: string;
  createdAt?: Date;
  inverterId: string;
  userId: string;
  powerInRealTime: number;
  powerToday: number;
  powerMonth: number;
  powerYear: number;
  allPower: number;
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

export interface PowerGeneratedJoined {
  _id?: string;
  createdAt?: Date;
  powerInRealTime: string;
  powerToday: string;
  powerMonth: string;
  powerYear: string;
  allPower: string;
  co2?: string;
  coal?: string;
  tree?: string;
}
