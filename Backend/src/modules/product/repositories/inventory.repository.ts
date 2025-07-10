import { Repository } from "typeorm";
import { Inventory } from "../entities/inventory.entity";
import { AppData } from "../../../config/db";
import { CreateInventoryDto } from "../dtos/createInventory.entity";
import { Product } from "../entities/product.entity";

export class InventoryRepository extends Repository<Inventory> {
  constructor() {
    super(Inventory, AppData.manager);
  }

  async createInventory(
    data: CreateInventoryDto & { product: Product },
  ): Promise<Inventory> {
    const inventory = this.create({
      ...data,
      available_stock: data.quantity_on_stock,
      reserved_stock: 0,
    });

    return this.save(inventory);
  }
}
