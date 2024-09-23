"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link"; // Import Link for navigation
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

// Mock product data
const products = [
  {
    id: 11,
    name: "Áo dài truyền thống Việt Nam",
    image: "/placeholder.svg?height=300&width=200",
  },
  {
    id: 21,
    name: "Váy hoa nhẹ nhàng mùa hè",
    image: "/placeholder.svg?height=300&width=200",
  },
  {
    id: 31,
    name: "Áo khoác denim phong cách",
    image: "/placeholder.svg?height=300&width=200",
  },
  {
    id: 41,
    name: "Đầm maxi dạo phố buổi tối",
    image: "/placeholder.svg?height=300&width=200",
  },
  {
    id: 51,
    name: "Áo sơ mi trắng cổ điển công sở",
    image: "/placeholder.svg?height=300&width=200",
  },
  {
    id: 61,
    name: "Quần culottes thanh lịch nữ tính",
    image: "/placeholder.svg?height=300&width=200",
  },
  {
    id: 71,
    name: "Áo kiểu cách điệu thời trang",
    image: "/placeholder.svg?height=300&width=200",
  },
  {
    id: 81,
    name: "Chân váy bút chì ôm body",
    image: "/placeholder.svg?height=300&width=200",
  },
];

export default function SuggestionComponent() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 4 + products.length) % products.length
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 4) % products.length);
  };

  return (
    <div className="w-full px-4 py-8">
      <h2 className="text-2xl font-bold mb-6 text-center">Sản phẩm tương tự</h2>
      <div className="relative">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {products.slice(currentIndex, currentIndex + 4).map((product) => (
            <Link key={product.id} href={`/product/${product.id}`} passHref>
              <div className="flex flex-col items-center cursor-pointer">
                <Image
                  src={product.image}
                  alt={product.name}
                  width={200}
                  height={300}
                  className="w-full h-auto object-cover rounded-lg mb-2"
                />
                <h3
                  className="text-lg font-semibold mb-2 text-center w-full whitespace-nowrap overflow-hidden text-ellipsis px-2"
                  title={product.name}
                >
                  {product.name}
                </h3>
                <Button variant="outline" size="sm">
                  Đọc tiếp
                </Button>
              </div>
            </Link>
          ))}
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-full"
          onClick={handlePrev}
        >
          <ChevronLeft className="h-6 w-6" />
          <span className="sr-only">Previous</span>
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-full"
          onClick={handleNext}
        >
          <ChevronRight className="h-6 w-6" />
          <span className="sr-only">Next</span>
        </Button>
      </div>
    </div>
  );
}
