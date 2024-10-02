import { User } from "./user";

export class Inventory {
    itemId?: number;
    name?: string;
    createdAt?: Date;
    updatedAt?: Date;
    available?: boolean;
    catagory?: string;
    checkedOutBy?: number | null;
    isCheckedOut?: boolean;
    itemImg?: string;
    User?: User;
    CheckedOutUser?: User;

    constructor(itemId?: number, name?: string, createdAt?: Date, updatedAt?: Date, available?: boolean, catagory?: string, itemImg?: string) {
        this.itemId = itemId;
        this.name = name;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.available = available;
        this.catagory = catagory;
        this.itemImg = itemImg;
    }
}