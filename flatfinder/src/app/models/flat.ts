export interface Flat {
  _id?: string;
  city: string;
  streetName: string;
  streetNumber: number;
  areaSize: number;
  hasAC: boolean;
  yearBuilt: number;
  rentPrice: number;
  dateAvailable: string;
  ownerId: string;
  ownerName: string;
  ownerEmail: string;
  favouriteBy?: string[];
}