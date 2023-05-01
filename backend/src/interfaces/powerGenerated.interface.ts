import { InversorInterface } from './inversor.interface';

export interface PowerGeneretedInterface {
  id?: number;
  createdAt?: Date;
  inversor: InversorInterface;
  inversorId: number;
  powerInRealTime?: number;
  todayPerformance: number;
  monthPerformace: number;
  yearPerformace: number;
  allPerformace: number;
  co2Value?: number;
  coalValue?: number;
  treeValue?: number;
}
