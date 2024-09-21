"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

// Mock product data
const products = [
  {
    id: 1,
    name: "Set váy croptop chân váy da – SAC424",
    price: 450000,
    image: "/placeholder.svg",
  },
  {
    id: 2,
    name: "Set váy len đính gấu – SAF423",
    price: 550000,
    image: "/placeholder.svg",
  },
  {
    id: 3,
    name: "Set váy len kem đuôi cá – SAE422",
    price: 650000,
    image: "/placeholder.svg",
  },
  {
    id: 4,
    name: "Đầm tiệc 2 dây lông vũ – SAE221",
    price: 750000,
    image: "/placeholder.svg",
  },
  {
    id: 5,
    name: "Áo khoác dạ tweed – SAF425",
    price: 850000,
    image: "/placeholder.svg",
  },
  {
    id: 6,
    name: "Quần jeans ống rộng – SAJ426",
    price: 350000,
    image: "/placeholder.svg",
  },
  {
    id: 7,
    name: "Áo sơ mi lụa – SAS427",
    price: 400000,
    image: "/placeholder.svg",
  },
  {
    id: 8,
    name: "Váy midi hoa nhí – SAV428",
    price: 500000,
    image: "/placeholder.svg",
  },
  {
    id: 9,
    name: "Áo len cổ lọ – SAL429",
    price: 450000,
    image: "/placeholder.svg",
  },
  {
    id: 10,
    name: "Chân váy xếp ly – SAC430",
    price: 380000,
    image: "/placeholder.svg",
  },
  {
    id: 11,
    name: "Áo blazer oversize – SAB431",
    price: 700000,
    image: "/placeholder.svg",
  },
  {
    id: 12,
    name: "Đầm maxi hở lưng – SAM432",
    price: 600000,
    image: "/placeholder.svg",
  },
  {
    id: 13,
    name: "Quần culottes – SAQ433",
    price: 420000,
    image: "/placeholder.svg",
  },
  {
    id: 14,
    name: "Áo crop top – SAT434",
    price: 280000,
    image: "/placeholder.svg",
  },
  {
    id: 15,
    name: "Váy slip dress – SAV435",
    price: 550000,
    image: "/placeholder.svg",
  },
  {
    id: 16,
    name: "Áo cardigan dài – SAC436",
    price: 480000,
    image: "/placeholder.svg",
  },
  {
    id: 17,
    name: "Quần short da – SAS437",
    price: 400000,
    image: "/placeholder.svg",
  },
  {
    id: 18,
    name: "Áo polo thêu logo – SAP438",
    price: 350000,
    image: "/placeholder.svg",
  },
  {
    id: 19,
    name: "Váy wrap đắp chéo – SAW439",
    price: 520000,
    image: "/placeholder.svg",
  },
  {
    id: 20,
    name: "Áo hoodie oversize – SAH440",
    price: 450000,
    image: "/placeholder.svg",
  },
];

export default function NewProduct() {
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8;
  const totalPages = Math.ceil(products.length / productsPerPage);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Sản phẩm mới</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {currentProducts.map((product) => (
          <Card key={product.id} className="overflow-hidden">
            <Link href={`/product/${product.id}`}>
              <Image
                src={product.image}
                alt={product.name}
                width={300}
                height={300}
                className="w-full h-64 object-cover"
              />
            </Link>
            <CardContent className="p-4">
              <h2 className="text-lg font-semibold mb-2">{product.name}</h2>
              <p className="text-gray-600">
                {product.price.toLocaleString("vi-VN")} ₫
              </p>
            </CardContent>
            <CardFooter className="p-4">
              <Link href={`/product/${product.id}`}>
                <Button variant="outline" className="w-full">
                  Xem chi tiết
                </Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
      <div className="flex justify-center mt-8">
        {Array.from({ length: totalPages }, (_, i) => (
          <Button
            key={i + 1}
            onClick={() => paginate(i + 1)}
            variant={currentPage === i + 1 ? "default" : "outline"}
            className="mx-1"
          >
            {i + 1}
          </Button>
        ))}
      </div>
    </div>
  );
}
