export type cartProduct = {
  product_id: string;
  product_title: string;
  event_id: string;
  price: number;
  quantity: number;
  category_id: number | null;
  sub_category_id: number | null;
  category_allow_multiple: boolean;
  subcategory_allow_multiple?: boolean;
};
