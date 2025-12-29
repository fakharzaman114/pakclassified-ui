import { AdvertisementCategory } from './advertisementCategory.model';

export interface AdvertisementSubCategory {
  id: number;
  name?: string;
  image?: string;
  category?: AdvertisementCategory;
}
