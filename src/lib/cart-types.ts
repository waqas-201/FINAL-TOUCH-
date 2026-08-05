export type CartItem = {
  key: string;
  slug: string;
  name: string;
  image: string;
  price: number;
  size: string;
  color: string;
  shadeCode?: string;
  shadeHex?: string;
  quantity: number;
};

export type AddToCartItem = Omit<CartItem, "key" | "quantity"> & { quantity?: number };
