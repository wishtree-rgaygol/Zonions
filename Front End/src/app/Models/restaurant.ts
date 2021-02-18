import { Byte } from "@angular/compiler/src/util";
export class Restaurant {
    id: number;
    restName: string;
    address: string;
    phoneNo: number;
    openTime: string;
    closeTime: string;
    lastModifiedTime: string;
    active: boolean;
    name:string;
    type:string;
	picByte:Byte[];
}
