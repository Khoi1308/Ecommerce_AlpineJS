import { QueryRunner, Repository } from "typeorm";
import { Inventory } from "../entities/inventory.entity";
import { AppData } from "../../../config/db";
import { CreateInventoryDto } from "../dtos/createInventory.entity";
import { Product } from "../entities/product.entity";
import { appAssert } from "../../../utils/appAssert";
import { NOT_FOUND } from "../../../config/http";

export class InventoryRepository extends Repository<Inventory> {
  constructor() {
    super(Inventory, AppData.manager);
  }

  async findInventoryById(inventory_id: string): Promise<Inventory> {
    const inventory = await this.createQueryBuilder("inventory")
      .leftJoinAndSelect("inventory.product", "product")
      .where("inventory.inventoryId = :id", { id: inventory_id })
      .getOne();
    appAssert(inventory, NOT_FOUND, "inventory not found");

    return inventory;
  }

  async createInventory(
    data: CreateInventoryDto & { product: Product },
    queryRunner: QueryRunner,
  ): Promise<Inventory> {
    const inventory = queryRunner.manager.create(Inventory, {
      ...data,
      available_stock: data.quantity_on_stock,
    });

    return await queryRunner.manager.save(inventory);
  }
}
