export const generateIdempotencyKey = (
  user_id: string,
  product_id: string,
  quantity: number,
) => {
  const timestamp = Date.now();

  return `cart_${user_id}_${quantity}_${product_id}_${timestamp}`;
};
