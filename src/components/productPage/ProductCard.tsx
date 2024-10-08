"use client";

import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useDispatch } from "react-redux";
import { addItem } from "@/store/cartSlice";
import { ShoppingCart } from "lucide-react";

type ProductCardProps = {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
};

export default function ProductCard({
  id,
  name,
  description,
  price,
  image,
}: ProductCardProps) {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(
      addItem({
        id,
        name,
        description,
        price,
        image,
        quantity: 1,
      })
    );
  };

  return (
    <Card className="overflow-hidden">
      <Image
        src={image}
        alt={name}
        width={300}
        height={300}
        className="w-full h-64 object-cover"
      />
      <CardContent className="p-4">
        <h2 className="text-lg font-semibold mb-2">{name}</h2>
        <p className="text-gray-600 mb-2 line-clamp-2">{description}</p>{" "}
        {/* Updated to use line-clamp-2 */}
        <p className="text-gray-600">{price.toLocaleString("vi-VN")} ₫</p>
      </CardContent>
      <CardFooter className="p-4 flex justify-between">
        <Link href={`/product/${id}`} passHref>
          <Button variant="outline" className="w-full">
            Xem chi tiết
          </Button>
        </Link>
        <Button variant="ghost" size="icon" onClick={handleAddToCart}>
          <ShoppingCart className="h-5 w-5" />
        </Button>
      </CardFooter>
    </Card>
  );
}
