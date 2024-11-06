"use client";

import useCartStore from "@/lib/store/cart";
import { Product } from "@/lib/types";
import { getCurrencyInWon } from "@/utils/utils";
import { X } from "lucide-react";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

export default function BuyTicketProductCard({
  product,
}: {
  product: Product;
}) {
  const cart = useCartStore((state) => state.cart);
  const addToCart = useCartStore((state) => state.addToCart);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const isInCart = cart.filter((item) => item.product_id === product.id).length;
  const cartProduct = {
    event_id: product.event_id,
    product_id: product.id,
    product_title: product.title,
    price: product.price,
    category_id: product.category_id,
    sub_category_id: product.sub_category_id || null,
    quantity: 1,
    category_allow_multiple: product.categories?.allow_multiple || false,
    sub_category_allow_multiple:
      product.sub_categories?.allow_multiple || false,
  };

  return (
    <Card
      key={product.id}
      className={`p-4 flex flex-col justify-between h-auto lg:h-48 ${
        isInCart > 0 && "bg-purple-100"
      }`}
    >
      <div>
        <CardHeader className="p-1 lg:p-2">
          <CardTitle className="text-sm lg:text-base text-gray-700">
            {product.title}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-1 lg:p-2">
          <p className="text-sm lg:text-base font-semibold mb-2 text-gray-700">
            {getCurrencyInWon(product.price)}
          </p>
        </CardContent>
      </div>
      <div>
        {product.max_quantity > 0 ? (
          <div className="flex items-center justify-end mt-4 lg:mt-0">
            <Button
              variant="outline"
              size="sm"
              className="w-1/3 md:w-1/2"
              onClick={() =>
                isInCart > 0
                  ? removeFromCart(cartProduct)
                  : addToCart(cartProduct)
              }
            >
              {isInCart > 0 ? (
                <div className="w-auto flex items-center">
                  <X className="mr-2 h-3 w-3 lg:h-4 lg:w-4" /> 취소
                </div>
              ) : (
                "담기"
              )}
            </Button>
          </div>
        ) : (
          <p className="text-red-500 font-semibold text-xs lg:text-sm text-center py-1.5 mt-4 lg:mt-0">
            Sold Out
          </p>
        )}
      </div>
    </Card>
  );
}
