"use client";

import { useSelector, useDispatch } from "react-redux";
import { removeItem } from "@/store/cartSlice";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { RootState } from "@/store/store";

export default function ShoppingCart() {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();

  const handleRemoveItem = (id: number) => {
    dispatch(removeItem(id));
  };

  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto p-8">
        <h1 className="text-3xl font-bold mb-6">Giỏ hàng của bạn</h1>
        <p>Giỏ hàng của bạn đang trống.</p>
        <Link href="/">
          <Button variant="outline" className="mt-4">
            Tiếp tục mua sắm
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Giỏ hàng của bạn</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {cartItems.map((item) => (
          <div
            key={item.id}
            className="border rounded-lg overflow-hidden shadow-sm"
          >
            <Image
              src={item.image}
              alt={item.name}
              width={300}
              height={300}
              className="w-full h-64 object-cover"
            />
            <div className="p-4">
              <h2 className="text-lg font-semibold mb-2">{item.name}</h2>
              <p className="text-gray-600">Số lượng: {item.quantity}</p>
              <p className="text-gray-600 mb-4">
                Giá: {item.price.toLocaleString("vi-VN")} ₫
              </p>
              <div className="flex justify-between space-x-4">
                <Link href={`/product/${item.id}`} passHref>
                  <Button variant="outline" className="w-full">
                    Xem chi tiết
                  </Button>
                </Link>
                <Button
                  variant="outline"
                  onClick={() => handleRemoveItem(item.id)}
                >
                  Xóa khỏi giỏ hàng
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
