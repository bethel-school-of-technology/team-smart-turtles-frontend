import { User } from "./user";

export class Inventory {
    itemId?: number;
    name?: string;
    createdAt?: Date;
    updatedAt?: Date;
    available?: boolean;
    catagory?: string;
    checkedOutBy?: User | null; // User who checked it out, null if available
    isCheckedOut?: boolean;     // Tracks if the item is checked out

    constructor(itemId?: number, name?: string, createdAt?: Date, updatedAt?: Date, available?: boolean, catagory?: string) {
        this.itemId = itemId;
        this.name = name;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.available = available;
        this.catagory = catagory;
    }
}