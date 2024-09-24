"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";

import ProductCard from "../productPage/ProductCard";

// Mock product data
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
