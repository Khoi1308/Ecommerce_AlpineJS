import { EntityManager, In, QueryRunner, Repository } from "typeorm";
import { Voucher } from "../entities/voucher.entity";
import { AppData } from "../../../config/db";
import {
  VoucherApplicableProduct,
  VoucherExcludedProduct,
} from "../entities/voucherProduct.entity";
import { Product } from "../../product/entities/product.entity";
import { Category } from "../../category/entities/category.entity";
import { Campaign } from "../../campaign/entities/campaign.entity";
import { CampainVoucher } from "../../campaign/entities/campaignVoucher.entity";

export class VoucherRepository {
  private static readonly BATCH_SIZE = 500;
  private entityManager: EntityManager;
  private voucher_repository: Repository<Voucher>;
  private product_repository: Repository<Product>;

  constructor(entityManager?: EntityManager) {
    this.entityManager = entityManager || AppData.manager;
    this.voucher_repository = this.entityManager.getRepository(Voucher);
    this.product_repository = this.entityManager.getRepository(Product);
  }

  withTransaction(entityManager: EntityManager): VoucherRepository {
    return new VoucherRepository(entityManager);
  }

  // async createVoucher(
  //   voucher_data: Partial<Voucher>,
  //   queryRunner: QueryRunner,
  // ): Promise<Voucher> {
  //   const new_voucher = queryRunner.manager.create(Voucher, voucher_data);
  //
  //   return queryRunner.manager.save(new_voucher);
  // }

  async getVoucherByCode(voucher_code: string): Promise<Voucher | null> {
    return this.voucher_repository.findOne({
      where: {
        voucher_code: voucher_code,
        delete_flag: false,
      },
    });
  }

  async createVoucher(voucher_data: Partial<Voucher>): Promise<Voucher> {
    const new_voucher = this.voucher_repository.create(voucher_data);

    return this.voucher_repository.save(new_voucher);
  }

  // Applicable product
  async createApplicableProducts(voucher_data: Voucher, products: Product[]) {
    const BATCH_SIZE = VoucherRepository.BATCH_SIZE;

    for (let i = 0; i < products.length; i += BATCH_SIZE) {
      const chunk = products.slice(i, i + BATCH_SIZE);

      await this.entityManager
        .createQueryBuilder()
        .insert()
        .into(VoucherApplicableProduct)
        .values(
          chunk.map((product) => ({
            voucher: voucher_data,
            product: product,
          })),
        )
        .execute();
    }
  }

  // Excluded product
  async createExcludedProducts(voucher_data: Voucher, products: Product[]) {
    const BATCH_SIZE = VoucherRepository.BATCH_SIZE;

    for (let i = 0; i < products.length; i += BATCH_SIZE) {
      const chunk = products.slice(i, i + BATCH_SIZE);

      await this.entityManager
        .createQueryBuilder()
        .insert()
        .into(VoucherExcludedProduct)
        .values(
          chunk.map((product) => ({
            voucher: voucher_data,
            product: product,
          })),
        )
        .execute();
    }
  }

  // Campaign
  async createCampaignVoucher(voucher_data: Voucher, campaigns: Campaign[]) {
    const BATCH_SIZE = VoucherRepository.BATCH_SIZE;

    for (let i = 0; i < campaigns.length; i += BATCH_SIZE) {
      const chunk = campaigns.slice(i, i + BATCH_SIZE);

      await this.entityManager
        .createQueryBuilder()
        .insert()
        .into(CampainVoucher)
        .values(
          chunk.map((campaign) => ({
            voucher: voucher_data,
            campaign: campaign,
          })),
        )
        .execute();
    }
  }

  async validateProductsExist(product_ids: string[]): Promise<Product[]> {
    if (!product_ids.length) {
      return [];
    }

    const products = await this.product_repository.find({
      where: {
        productId: In(product_ids),
        is_active: true,
      },
    });

    const found_products = products.map((p) => p.productId);
    const missing_ids = product_ids.filter(
      (id) => !found_products.includes(id),
    );

    if (missing_ids.length > 0) {
      throw new Error(
        `Products not found or inactive: ${missing_ids.join(", ")}`,
      );
    }

    return products;
  }
}
