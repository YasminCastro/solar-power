export default interface IInverter {
  id: number;
  createdAt: string;
  name: string;
  model: string;
  url?: string;
  username?: string;
  password?: string;
  active: boolean;
  cep: string;
  lat: string;
  long: string;
  maxRealTimePower: number;
}
