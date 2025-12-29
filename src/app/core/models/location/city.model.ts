import { Province } from './province.model';

export interface City {
  id: number;
  name?: string;
  province?: Province;
}
