import { create } from "zustand";
import { cartProduct } from "../types/cartProduct";
import { persist } from "zustand/middleware";

interface CartState {
  cart: cartProduct[];
  totalItems: number;
  totalPrice: number;
  // addItemToCart: (item: Tables<"products">) => void;
}

// Define the interface of the actions that can be performed in the Cart
interface Actions {
  addToCart: (Item: cartProduct) => void;
  removeFromCart: (Item: cartProduct) => void;
  cleanCart: () => void;
}

// Initialize a default state
const INITIAL_STATE: CartState = {
  cart: [],
  totalItems: 0,
  totalPrice: 0,
};

// Create the store with Zustand, combining the status interface and actions
export const useCartStore = create(
  persist<CartState & Actions>(
    (set, get) => ({
      cart: INITIAL_STATE.cart,
      totalItems: INITIAL_STATE.totalItems,
      totalPrice: INITIAL_STATE.totalPrice,
      addToCart: (product: cartProduct) => {
        const cart = get().cart;
        const cartItem = cart.find(
          (item) => item.product_id === product.product_id
        );
        const itemToRemoveByCategory = cart.filter(
          (item) =>
            item.category_id === product.category_id &&
            item.product_id !== product.product_id
        );
        const itemToRemoveBySubCategory = cart.filter(
          (item) =>
            item?.sub_category_id &&
            product?.sub_category_id &&
            item?.sub_category_id === product?.sub_category_id &&
            item.product_id !== product.product_id
        );

        if (
          !product.category_allow_multiple &&
          itemToRemoveByCategory.length > 0
        ) {
          const cartItemOtherCate = cart.filter(
            (item) => item.category_id !== product.category_id
          );

          set((state) => ({
            cart: [...cartItemOtherCate, product],
            totalItems: state.totalItems,
            totalPrice:
              state.totalPrice -
              itemToRemoveByCategory[0].price +
              product.price,
          }));
        } else if (
          !product.subcategory_allow_multiple &&
          itemToRemoveBySubCategory.length > 0
        ) {
          const cartItemOtherSubCate = cart.filter(
            (item) => item?.sub_category_id !== product?.sub_category_id
          );

          set((state) => ({
            cart: [...cartItemOtherSubCate, product],
            totalItems: state.totalItems,
            totalPrice:
              state.totalPrice -
              itemToRemoveBySubCategory[0].price +
              product.price,
          }));
        } else {
          if (cartItem) {
            const updatedCart = cart.map((item) =>
              item.product_id === product.product_id
                ? { ...item, quantity: (item.quantity as number) + 1 }
                : item
            );

            set((state) => ({
              cart: updatedCart,
              totalItems: state.totalItems + 1,
              totalPrice: state.totalPrice + product.price,
            }));
          } else {
            const updatedCart = [...cart, { ...product, quantity: 1 }];
            set((state) => ({
              cart: updatedCart,
              totalItems: state.totalItems + 1,
              totalPrice: state.totalPrice + product.price,
            }));
          }
        }
      },
      removeFromCart: (product: cartProduct) => {
        set((state) => ({
          cart: state.cart.filter(
            (item) => item.product_id !== product.product_id
          ),
          totalItems: state.totalItems - 1,
          totalPrice: state.totalPrice - product.price,
        }));
      },
      cleanCart: () => {
        set(() => ({
          cart: [],
          totalItems: 0,
          totalPrice: 0,
        }));
      },
    }),
    {
      name: "cart-storage",
    }
  )
);
export default useCartStore;
