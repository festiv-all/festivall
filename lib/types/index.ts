import { Tables } from "./database.types";

export type Product = Tables<"products"> & {
  categories: Tables<"categories"> | null;
} & {
  sub_categories: Tables<"sub_categories"> | null;
};

export type Category = Tables<"categories">;

export type UserData = Tables<"users">;

export type Order = Tables<"orders"> & {
  events: Tables<"events">;
} & {
  order_items: (Tables<"order_items"> & {
    attendees: Tables<"attendees">[];
    products: Tables<"products">;
  })[];
};

export type OrderPayment = Tables<"order_payments">;
