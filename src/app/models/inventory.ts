export class Inventory {
    itemId?: number;
    name?: string;
    createdAt?: Date;
    updatedAt?: Date;
    available?: boolean;
    category?: string;

    constructor(itemId?: number, name?: string, createdAt?: Date, updatedAt?: Date, available?: boolean, category?: string) {
        this.itemId = itemId;
        this.name = name;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.available = available;
        this.category = category;
    }
}