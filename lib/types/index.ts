import { Tables } from "./database.types";

export type Product = Tables<"products"> & {
  categories: Tables<"categories"> | null;
} & {
  sub_categories: Tables<"sub_categories"> | null;
};

export type Category = Tables<"categories">;

export type UserData = Tables<"users">;
