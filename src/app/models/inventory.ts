export class Inventory {
    itemId?: number;
    name?: string;
    createdAt?: Date;
    updatedAt?: Date;
    available?: boolean;

    constructor(itemId?: number, name?: string, createdAt?: Date, updatedAt?: Date, available?: boolean) {
        this.itemId = itemId;
        this.name = name;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.available = available;
    }
}