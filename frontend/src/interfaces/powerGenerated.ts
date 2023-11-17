export interface IPowerGenerated {
  _id: string;
  createdAt: string;
  inverterId: string;
  powerInRealTime: number;
  powerToday: number;
  powerMonth: number;
  powerYear: number;
  allPower: number;
  co2?: string;
  coal?: string;
  tree?: string;
}
