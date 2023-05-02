export interface HauweiDataInterface {
  powerInRealTime: number;
  powerToday: number;
  powerMonth: number;
  powerYear: number;
  allPower: number;
  co2: number;
  coal: number;
  tree: number;
}

export interface ElginDataInterface {
  powerToday: number;
  powerMonth: number;
  powerYear: number;
  allPower: number;
  co2: number;
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
