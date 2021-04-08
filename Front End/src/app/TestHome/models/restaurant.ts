import { Byte } from '@angular/compiler/src/util';
export class Restaurant {
  restid: number;
  restname: string;
  restaddress: string;
  restphone: string;
  openTime = '';
  closeTime = '';
  active: boolean;
  lastModified: string;
  name: string;
  type: string;
  picByte: Byte[];
  img: string;
  dining: boolean;
  takeaway: boolean;
  homedelivery: boolean;
  visitCount: number;
}
