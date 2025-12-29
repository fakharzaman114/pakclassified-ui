import { CityArea } from '../location/cityArea.model';
import { AdvertisementStatus } from './advertisementStatus.model';
import { AdvertisementType } from './advertisementType.model';
import { AdvertisementImage } from './advertisementImage.model';
import { AdvertisementTag } from './advertisementTag.model';
import { AdvertisementSubCategory } from './advertisementSubCategory.model';
import { User } from '../userEntities/user.model';

// Main Advertisement interface
export interface Advertisement {
  id: number;
  name: string;
  description?: string;
  price: number;
  hits: number;
  startsOn: Date;
  endsOn: Date;

  cityAreaId: number;
  subCategoryId: number;
  postedById: number;
  typeId: number;
  statusId: number;

  // Nested objects
  cityArea?: CityArea;
  subCategory?: AdvertisementSubCategory;
  postedBy?: User;
  type?: AdvertisementType;
  status?: AdvertisementStatus;
  tags: AdvertisementTag[];
  images: AdvertisementImage[];
}

// For creating advertisements
export interface AdvertisementCreateModel {
  cityAreaId: number;
  subCategoryId: number;
  statusId: number;
  typeId: number;
  postedById: number;
  name: string;
  description?: string;
  hits: number;
  startsOn: Date;
  endsOn: Date;
  price: number;
  tagIds?: number[];
  newTagNames?: string[];
  images?: File[];
}

// For updating advertisements
export interface AdvertisementUpdateModel {
  id: number;
  cityAreaId: number;
  subCategoryId: number;
  statusId: number;
  typeId: number;
  postedById: number;
  name: string;
  description?: string;
  hits: number;
  startsOn: Date;
  endsOn: Date;
  price: number;
  tagIds?: number[];
  newTagNames?: string[];
  newImages?: File[];
  removeImageIds?: number[];
}

// For reading simplified ads
export interface AdvertisementReadModel {
  id: number;
  name: string;
  description?: string;
  price: number;
  hits: number;
  startsOn: Date;
  endsOn: Date;
  tags?: AdvertisementTag[];
  images?: AdvertisementImage[];
}
