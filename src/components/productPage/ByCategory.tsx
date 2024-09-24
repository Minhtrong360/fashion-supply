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
  description: string;
  category?: string;
  price: number;
  image: string;
};

type ProductListingProps = {
  categoryName: string; // Accept the categoryName as a prop
};

// Updated mock data for products including price
const products = [
  {
    id: 1,
    name: "Set váy croptop chân váy da – SAC424",
    price: 450000,
    image:
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?width=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZmFzaGlvbnxlbnwwfHwwfHx8MA%3D%3D",
    description: "A chic crop top and leather skirt set perfect for parties.",
  },
  {
    id: 2,
    name: "Set váy len đính gấu – SAF423",
    price: 550000,
    image:
      "https://images.unsplash.com/photo-1544957992-20514f595d6f?width=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGZhc2hpb258ZW58MHx8MHx8fDA%3D",
    description:
      "A cozy wool dress set with cute bear details, perfect for cold weather.",
  },
  {
    id: 3,
    name: "Set váy len kem đuôi cá – SAE422",
    price: 650000,
    image:
      "https://images.unsplash.com/photo-1509631179647-0177331693ae?width=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8ZmFzaGlvbnxlbnwwfHwwfHx8MA%3D%3D",
    description:
      "Elegant cream-colored mermaid tail dress set for a sophisticated look.",
  },
  {
    id: 4,
    name: "Đầm tiệc 2 dây lông vũ – SAE221",
    price: 750000,
    image:
      "https://images.unsplash.com/photo-1484327973588-c31f829103fe?width=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8ZmFzaGlvbnxlbnwwfHwwfHx8MA%3D%3D",
    description: "A glamorous feather-strap party dress for evening events.",
  },
  {
    id: 5,
    name: "Áo khoác dạ tweed – SAF425",
    price: 850000,
    image:
      "https://images.unsplash.com/photo-1571513800374-df1bbe650e56?width=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8ZmFzaGlvbnxlbnwwfHwwfHx8MA%3D%3D",
    description: "A timeless tweed overcoat to elevate any outfit.",
  },
  {
    id: 6,
    name: "Quần jeans ống rộng – SAJ426",
    price: 350000,
    image:
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?width=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZmFzaGlvbnxlbnwwfHwwfHx8MA%3D%3D",
    description: "Comfortable wide-leg jeans for a casual, relaxed style.",
  },
  {
    id: 7,
    name: "Áo sơ mi lụa – SAS427",
    price: 400000,
    image:
      "https://images.unsplash.com/photo-1495385794356-15371f348c31?width=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGZhc2hpb258ZW58MHx8MHx8fDA%3D",
    description: "A sleek silk blouse that adds elegance to your wardrobe.",
  },
  {
    id: 8,
    name: "Váy midi hoa nhí – SAV428",
    price: 500000,
    image:
      "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?width=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGZhc2hpb258ZW58MHx8MHx8fDA%3D",
    description: "Floral midi dress for a charming, vintage-inspired look.",
  },
  {
    id: 9,
    name: "Áo len cổ lọ – SAL429",
    price: 450000,
    image:
      "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?width=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGZhc2hpb258ZW58MHx8MHx8fDA%3D",
    description: "Cozy turtleneck sweater perfect for layering in winter.",
  },
  {
    id: 10,
    name: "Chân váy xếp ly – SAC430",
    price: 380000,
    image:
      "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?width=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGZhc2hpb258ZW58MHx8MHx8fDA%3D",
    description: "A stylish pleated skirt for casual and formal occasions.",
  },
  {
    id: 11,
    name: "Áo blazer oversize – SAB431",
    price: 700000,
    image:
      "https://images.unsplash.com/photo-1485231183945-fffde7cc051e?width=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGZhc2hpb258ZW58MHx8MHx8fDA%3D",
    description: "Oversized blazer for a bold, fashion-forward look.",
  },
  {
    id: 12,
    name: "Đầm maxi hở lưng – SAM432",
    price: 600000,
    image:
      "https://images.unsplash.com/photo-1544957992-20514f595d6f?width=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGZhc2hpb258ZW58MHx8MHx8fDA%3D",
    description: "Elegant backless maxi dress for summer days.",
  },
  {
    id: 13,
    name: "Quần culottes – SAQ433",
    price: 420000,
    image:
      "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?width=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGZhc2hpb258ZW58MHx8MHx8fDA%3D",
    description: "Chic culottes for a minimalist, contemporary style.",
  },
  {
    id: 14,
    name: "Áo crop top – SAT434",
    price: 280000,
    image:
      "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?width=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGZhc2hpb258ZW58MHx8MHx8fDA%3D",
    description: "Trendy crop top for a casual, everyday look.",
  },
  {
    id: 15,
    name: "Váy slip dress – SAV435",
    price: 550000,
    image:
      "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?width=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGZhc2hpb258ZW58MHx8MHx8fDA%3D",
    description: "Sleek slip dress, perfect for both day and night wear.",
  },
  {
    id: 16,
    name: "Áo cardigan dài – SAC436",
    price: 480000,
    image:
      "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?width=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGZhc2hpb258ZW58MHx8MHx8fDA%3D",
    description: "A long cardigan for layering with your favorite outfits.",
  },
  {
    id: 17,
    name: "Quần short da – SAS437",
    price: 400000,
    image:
      "https://images.unsplash.com/photo-1544957992-20514f595d6f?width=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGZhc2hpb258ZW58MHx8MHx8fDA%3D",
    description: "Leather shorts for a bold, edgy style.",
  },
  {
    id: 18,
    name: "Áo polo thêu logo – SAP438",
    price: 350000,
    image:
      "https://images.unsplash.com/photo-1544957992-20514f595d6f?width=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGZhc2hpb258ZW58MHx8MHx8fDA%3D",
    description: "Polo shirt with embroidered logo for a casual look.",
  },
  {
    id: 19,
    name: "Váy wrap đắp chéo – SAW439",
    price: 520000,
    image:
      "https://images.unsplash.com/photo-1544957992-20514f595d6f?width=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGZhc2hpb258ZW58MHx8MHx8fDA%3D",
    description: "Wrap dress for a feminine, elegant look.",
  },
  {
    id: 20,
    name: "Áo hoodie oversize – SAH440",
    price: 450000,
    image:
      "https://images.unsplash.com/photo-1544957992-20514f595d6f?width=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGZhc2hpb258ZW58MHx8MHx8fDA%3D",
    description: "Oversized hoodie for a cozy, relaxed style.",
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
            description={product.description}
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
