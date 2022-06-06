export interface Room {
  id?: number;
  name: string;
  roomType: number;
  location: number;
  wallpaper: string;
  availability: boolean;
  typeName: string;
  areaSize: number;
  maxNumPpl: number;
  weekdayPrice: number;
  weekendPrice: number;
  extraTimeCharge: number;
}
