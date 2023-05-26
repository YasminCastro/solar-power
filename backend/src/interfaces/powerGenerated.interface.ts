export interface HauweiDataInterface {
  powerInRealTime: string;
  powerToday: string;
  powerMonth: string;
  powerYear: string;
  allPower: string;
  co2: string;
  coal: string;
  tree: string;
}

export interface ElginDataInterface {
  powerToday: string;
  powerMonth: string;
  powerYear: string;
  allPower: string;
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
