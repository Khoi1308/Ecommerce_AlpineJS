export enum IVoucherType {
  PERCENTAGE = "percentage",
  FIXED_AMOUNT = "fixed_amount",
  FREE_SHIPPING = "free_shipping",
}

export enum IVoucherTarget {
  ALL_USERS = "ALL_USERS",
  NEW_USERS = "NEW_USERS",
  LOYAL_USERS = "LOYAL_USERS",
  SPECIFIC_USERS = "SPECIFIC_USERS"
}
export enum IVoucherApplicability {
  ALL_PRODUCT = "all_product",
  SPECIFIC_CATEGORIES = "specific_categories",
  SPECIFIC_PRODUCTS = "specific_products",
  EXCLUDE_PRODUCTS = "exclude_products",
}
