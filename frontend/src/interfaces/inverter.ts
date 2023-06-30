export default interface IInverter {
  _id: string;
  userId: string;
  name: string;
  model: string;
  username?: string;
  password?: string;
  url?: string;
  active: boolean;
  cep: string;
  lat: string;
  long: string;
  maxRealTimePower: number;
  createdAt: string;
}
