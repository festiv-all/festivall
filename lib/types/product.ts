import { Tables } from "./database.types";

export type Product = Tables<"products"> & {
  categories: Tables<"categories">;
} & {
  sub_categories: Tables<"sub_categories">;
};
