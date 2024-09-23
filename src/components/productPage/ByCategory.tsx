import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ProductCard from "./ProductCard";

type Product = {
  id: number;
  name: string;
  category?: string;
  price: number;
  image: string;
};

type ProductListingProps = {
  categoryName: string; // Accept the categoryName as a prop
};

// Updated mock data for products including price
const products: Product[] = [
  {
    id: 1,
    name: "Áo thun kem tay dài - SOE294",
    price: 350000,
    image: "/placeholder.svg?height=300&width=300",
  },
  {
    id: 2,
    name: "Bikini tôn nâu tay ngắn - SAC241",
    price: 450000,
    image: "/placeholder.svg?height=300&width=300",
  },
  {
    id: 3,
    name: "Đầm 2 dây kem phối ren - mã DAD466",
    price: 550000,
    image: "/placeholder.svg?height=300&width=300",
  },
  {
    id: 4,
    name: "Đầm 2 dây nhiều nơ - mã DC0529",
    price: 500000,
    image: "/placeholder.svg?height=300&width=300",
  },
  {
    id: 5,
    name: "Áo khoác nhẹ chống nắng",
    price: 400000,
    image: "/placeholder.svg?height=300&width=300",
  },
  {
    id: 6,
    name: "Quần short đi biển nam",
    price: 300000,
    image: "/placeholder.svg?height=300&width=300",
  },
  {
    id: 7,
    name: "Mũ rộng vành chống nắng",
    price: 200000,
    image: "/placeholder.svg?height=300&width=300",
  },
  {
    id: 8,
    name: "Túi đeo chéo du lịch",
    price: 350000,
    image: "/placeholder.svg?height=300&width=300",
  },
  {
    id: 9,
    name: "Giày sandal đi biển",
    price: 400000,
    image: "/placeholder.svg?height=300&width=300",
  },
  {
    id: 10,
    name: "Áo chống nắng toàn thân",
    price: 600000,
    image: "/placeholder.svg?height=300&width=300",
  },
  {
    id: 11,
    name: "Kính mát thời trang",
    price: 250000,
    image: "/placeholder.svg?height=300&width=300",
  },
  {
    id: 12,
    name: "Váy maxi đi biển",
    price: 550000,
    image: "/placeholder.svg?height=300&width=300",
  },
  {
    id: 13,
    name: "Áo thun nam cổ tròn",
    price: 280000,
    image: "/placeholder.svg?height=300&width=300",
  },
  {
    id: 14,
    name: "Quần jogger nữ thoáng mát",
    price: 380000,
    image: "/placeholder.svg?height=300&width=300",
  },
  {
    id: 15,
    name: "Áo sơ mi nam ngắn tay",
    price: 420000,
    image: "/placeholder.svg?height=300&width=300",
  },
  {
    id: 16,
    name: "Đầm suông oversize",
    price: 480000,
    image: "/placeholder.svg?height=300&width=300",
  },
];

export default function ByCategory({ categoryName }: ProductListingProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOrder, setSortOrder] = useState("default");
  const productsPerPage = 8;

  // Filter products based on the categoryName from the URL

  // const filteredProducts = products.filter(
  //   (product) => product.category === categoryName
  // );

  const sortProducts = (products: Product[]): Product[] => {
    switch (sortOrder) {
      case "price-asc":
        return [...products].sort((a, b) => a.price - b.price);
      case "price-desc":
        return [...products].sort((a, b) => b.price - a.price);
      case "name-asc":
        return [...products].sort((a, b) => a.name.localeCompare(b.name));
      case "name-desc":
        return [...products].sort((a, b) => b.name.localeCompare(a.name));
      default:
        return products;
    }
  };

  const sortedProducts = sortProducts(products);
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = sortedProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className="container mx-auto px-4">
      <nav className="text-sm py-4 bg-gray-100 px-4 rounded-md mb-6">
        <ol className="list-none p-0 inline-flex">
          <li className="flex items-center">
            <a href="/" className="text-gray-600 hover:text-gray-800">
              Home
            </a>
            <span className="mx-2 text-gray-500">/</span>
          </li>
          <li className="flex items-center">
            <a href="/san-pham" className="text-gray-600 hover:text-gray-800">
              Sản phẩm
            </a>
            <span className="mx-2 text-gray-500">/</span>
          </li>
          <li className="flex items-center">
            <span className="text-gray-800">
              {decodeURIComponent(categoryName)}
            </span>
          </li>
        </ol>
      </nav>

      <h1 className="text-3xl font-bold mb-6">
        {decodeURIComponent(categoryName)}
      </h1>

      <div className="flex justify-between items-center mb-6">
        <p className="text-sm">
          Hiển thị {indexOfFirstProduct + 1}–
          {Math.min(indexOfLastProduct, sortedProducts.length)} của{" "}
          {sortedProducts.length} kết quả
        </p>
        <Select onValueChange={setSortOrder}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Thứ tự mặc định" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="default">Thứ tự mặc định</SelectItem>
            <SelectItem value="price-asc">
              Thứ tự theo giá: thấp đến cao
            </SelectItem>
            <SelectItem value="price-desc">
              Thứ tự theo giá: cao xuống thấp
            </SelectItem>
            <SelectItem value="name-asc">Thứ tự theo tên: A-Z</SelectItem>
            <SelectItem value="name-desc">Thứ tự theo tên: Z-A</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {currentProducts.map((product) => (
          <ProductCard
            key={product.id}
            id={product.id}
            name={product.name}
            price={product.price}
            image={product.image}
          />
        ))}
      </div>

      <div className="flex justify-center mt-8">
        <Button
          variant="outline"
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
          className="mr-2"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        {Array.from({
          length: Math.ceil(sortedProducts.length / productsPerPage),
        }).map((_, index) => (
          <Button
            key={index}
            variant={currentPage === index + 1 ? "default" : "outline"}
            onClick={() => paginate(index + 1)}
            className="mx-1"
          >
            {index + 1}
          </Button>
        ))}
        <Button
          variant="outline"
          onClick={() => paginate(currentPage + 1)}
          disabled={
            currentPage === Math.ceil(sortedProducts.length / productsPerPage)
          }
          className="ml-2"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
