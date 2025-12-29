import { Country } from './country.model';

export interface Province {
  id: number;
  name?: string;
  country?: Country;
}
