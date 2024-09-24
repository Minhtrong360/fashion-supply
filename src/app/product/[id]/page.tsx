"use client";

import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import SuggestionComponent from "@/components/productPage/Suggestion";

// Define the Product type
type Product = {
  id: number;
  name: string;
  description: string;
  price: number;

  images: string[];
};

const products: Product[] = [
  {
    id: 1,
    name: "Set váy croptop chân váy da – SAC424",
    price: 450000,
    description: "A long cardigan for layering with your favorite outfits.",

    images: [
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?width=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZmFzaGlvbnxlbnwwfHwwfHx8MA%3D%3D",
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?width=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZmFzaGlvbnxlbnwwfHwwfHx8MA%3D%3D",
    ],
  },
  {
    id: 2,
    name: "Set váy len đính gấu – SAF423",
    price: 550000,
    description: "A long cardigan for layering with your favorite outfits.",

    images: [
      "https://images.unsplash.com/photo-1544957992-20514f595d6f?width=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGZhc2hpb258ZW58MHx8MHx8fDA%3D",
      "https://images.unsplash.com/photo-1544957992-20514f595d6f?width=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGZhc2hpb258ZW58MHx8MHx8fDA%3D",
    ],
  },
  {
    id: 3,
    name: "Set váy len kem đuôi cá – SAE422",
    price: 650000,
    description: "A long cardigan for layering with your favorite outfits.",

    images: [
      "https://images.unsplash.com/photo-1509631179647-0177331693ae?width=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8ZmFzaGlvbnxlbnwwfHwwfHx8MA%3D%3D",
      "https://images.unsplash.com/photo-1509631179647-0177331693ae?width=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8ZmFzaGlvbnxlbnwwfHwwfHx8MA%3D%3D",
    ],
  },
  {
    id: 4,
    name: "Đầm tiệc 2 dây lông vũ – SAE221",
    price: 750000,
    description: "A long cardigan for layering with your favorite outfits.",

    images: [
      "https://images.unsplash.com/photo-1484327973588-c31f829103fe?width=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8ZmFzaGlvbnxlbnwwfHwwfHx8MA%3D%3D",
      "https://images.unsplash.com/photo-1484327973588-c31f829103fe?width=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8ZmFzaGlvbnxlbnwwfHwwfHx8MA%3D%3D",
    ],
  },
  {
    id: 5,
    name: "Áo khoác dạ tweed – SAF425",
    price: 850000,
    description: "A long cardigan for layering with your favorite outfits.",

    images: [
      "https://images.unsplash.com/photo-1571513800374-df1bbe650e56?width=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8ZmFzaGlvbnxlbnwwfHwwfHx8MA%3D%3D",
      "https://images.unsplash.com/photo-1571513800374-df1bbe650e56?width=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8ZmFzaGlvbnxlbnwwfHwwfHx8MA%3D%3D",
    ],
  },
  {
    id: 6,
    name: "Quần jeans ống rộng – SAJ426",
    price: 350000,
    description: "A long cardigan for layering with your favorite outfits.",

    images: [
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?width=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZmFzaGlvbnxlbnwwfHwwfHx8MA%3D%3D",
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?width=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZmFzaGlvbnxlbnwwfHwwfHx8MA%3D%3D",
    ],
  },
  {
    id: 7,
    name: "Áo sơ mi lụa – SAS427",
    price: 400000,
    description: "A long cardigan for layering with your favorite outfits.",

    images: [
      "https://images.unsplash.com/photo-1495385794356-15371f348c31?width=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGZhc2hpb258ZW58MHx8MHx8fDA%3D",
      "https://images.unsplash.com/photo-1495385794356-15371f348c31?width=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGZhc2hpb258ZW58MHx8MHx8fDA%3D",
    ],
  },
  {
    id: 8,
    name: "Váy midi hoa nhí – SAV428",
    price: 500000,
    description: "A long cardigan for layering with your favorite outfits.",

    images: [
      "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?width=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGZhc2hpb258ZW58MHx8MHx8fDA%3D",
      "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?width=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGZhc2hpb258ZW58MHx8MHx8fDA%3D",
    ],
  },
  {
    id: 9,
    name: "Áo len cổ lọ – SAL429",
    price: 450000,
    description: "A long cardigan for layering with your favorite outfits.",

    images: [
      "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?width=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGZhc2hpb258ZW58MHx8MHx8fDA%3D",
      "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?width=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGZhc2hpb258ZW58MHx8MHx8fDA%3D",
    ],
  },
  {
    id: 10,
    name: "Chân váy xếp ly – SAC430",
    price: 380000,
    description: "A long cardigan for layering with your favorite outfits.",

    images: [
      "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?width=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGZhc2hpb258ZW58MHx8MHx8fDA%3D",
      "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?width=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGZhc2hpb258ZW58MHx8MHx8fDA%3D",
    ],
  },
  {
    id: 11,
    name: "Áo blazer oversize – SAB431",
    price: 700000,
    description: "A long cardigan for layering with your favorite outfits.",

    images: [
      "https://images.unsplash.com/photo-1485231183945-fffde7cc051e?width=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGZhc2hpb258ZW58MHx8MHx8fDA%3D",
      "https://images.unsplash.com/photo-1485231183945-fffde7cc051e?width=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGZhc2hpb258ZW58MHx8MHx8fDA%3D",
    ],
  },
  {
    id: 12,
    name: "Đầm maxi hở lưng – SAM432",
    price: 600000,
    description: "A long cardigan for layering with your favorite outfits.",

    images: [
      "https://images.unsplash.com/photo-1544957992-20514f595d6f?width=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGZhc2hpb258ZW58MHx8MHx8fDA%3D",
      "https://images.unsplash.com/photo-1544957992-20514f595d6f?width=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGZhc2hpb258ZW58MHx8MHx8fDA%3D",
    ],
  },
  {
    id: 13,
    name: "Quần culottes – SAQ433",
    price: 420000,
    description: "A long cardigan for layering with your favorite outfits.",

    images: [
      "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?width=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGZhc2hpb258ZW58MHx8MHx8fDA%3D",
      "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?width=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGZhc2hpb258ZW58MHx8MHx8fDA%3D",
    ],
  },
  {
    id: 14,
    name: "Áo crop top – SAT434",
    price: 280000,
    description: "A long cardigan for layering with your favorite outfits.",

    images: [
      "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?width=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGZhc2hpb258ZW58MHx8MHx8fDA%3D",
      "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?width=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGZhc2hpb258ZW58MHx8MHx8fDA%3D",
    ],
  },
  {
    id: 15,
    name: "Váy slip dress – SAV435",
    price: 550000,
    description: "A long cardigan for layering with your favorite outfits.",

    images: [
      "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?width=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGZhc2hpb258ZW58MHx8MHx8fDA%3D",
      "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?width=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGZhc2hpb258ZW58MHx8MHx8fDA%3D",
    ],
  },
  {
    id: 16,
    name: "Áo cardigan dài – SAC436",
    price: 480000,
    description: "A long cardigan for layering with your favorite outfits.",

    images: [
      "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?width=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGZhc2hpb258ZW58MHx8MHx8fDA%3D",
      "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?width=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGZhc2hpb258ZW58MHx8MHx8fDA%3D",
    ],
  },
  {
    id: 17,
    name: "Quần short da – SAS437",
    price: 400000,
    description: "A long cardigan for layering with your favorite outfits.",

    images: [
      "https://images.unsplash.com/photo-1544957992-20514f595d6f?width=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGZhc2hpb258ZW58MHx8MHx8fDA%3D",
      "https://images.unsplash.com/photo-1544957992-20514f595d6f?width=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGZhc2hpb258ZW58MHx8MHx8fDA%3D",
    ],
  },
  {
    id: 18,
    name: "Áo polo thêu logo – SAP438",
    price: 350000,
    description: "A long cardigan for layering with your favorite outfits.",

    images: [
      "https://images.unsplash.com/photo-1544957992-20514f595d6f?width=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGZhc2hpb258ZW58MHx8MHx8fDA%3D",
      "https://images.unsplash.com/photo-1544957992-20514f595d6f?width=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGZhc2hpb258ZW58MHx8MHx8fDA%3D",
    ],
  },
  {
    id: 19,
    name: "Váy wrap đắp chéo – SAW439",
    price: 520000,
    description: "A long cardigan for layering with your favorite outfits.",

    images: [
      "https://images.unsplash.com/photo-1544957992-20514f595d6f?width=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGZhc2hpb258ZW58MHx8MHx8fDA%3D",
      "https://images.unsplash.com/photo-1544957992-20514f595d6f?width=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGZhc2hpb258ZW58MHx8MHx8fDA%3D",
    ],
  },
  {
    id: 20,
    name: "Áo hoodie oversize – SAH440",
    price: 450000,
    description: "A long cardigan for layering with your favorite outfits.",

    images: [
      "https://images.unsplash.com/photo-1544957992-20514f595d6f?width=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGZhc2hpb258ZW58MHx8MHx8fDA%3D",
      "https://images.unsplash.com/photo-1544957992-20514f595d6f?width=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGZhc2hpb258ZW58MHx8MHx8fDA%3D",
    ],
  },
];

export default function ProductPage() {
  const { id } = useParams(); // Get the product id from the URL
  const [product, setProduct] = useState<Product | null>(null); // Product state type is Product or null
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    console.log("Navigated to product with ID:", id); // Log ID on navigation

    if (id) {
      const foundProduct = products.find(
        (prod) => prod.id === parseInt(id as string)
      );
      if (foundProduct) {
        console.log("Found product:", foundProduct); // Log product details
        setProduct(foundProduct);
      } else {
        console.error("Product not found for ID:", id);
      }
    }
  }, [id]);

  if (!product) {
    return <div>Product not found!</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <nav className="text-sm mb-4">
        <Link href="/" className="text-gray-500 hover:text-gray-700">
          Home
        </Link>{" "}
        /{" "}
        <Link href="/products" className="text-gray-500 hover:text-gray-700">
          Products
        </Link>{" "}
        / <span className="text-gray-900">{product.name}</span>
      </nav>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <div className="relative aspect-square">
            <Image
              src={product.images[currentImage]}
              alt={`Product image ${currentImage + 1}`}
              layout="fill"
              objectFit="cover"
              className="rounded-lg"
            />
            <button
              onClick={() =>
                setCurrentImage((prev) =>
                  prev > 0 ? prev - 1 : product.images.length - 1
                )
              }
              className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={() =>
                setCurrentImage((prev) =>
                  prev < product.images.length - 1 ? prev + 1 : 0
                )
              }
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
          <div className="grid grid-cols-6 gap-2">
            {product.images.map((src, index) => (
              <button
                key={index}
                onClick={() => setCurrentImage(index)}
                className={`aspect-square relative rounded-md overflow-hidden ${
                  currentImage === index ? "ring-2 ring-blue-500" : ""
                }`}
              >
                <Image
                  src={src}
                  alt={`Thumbnail ${index + 1}`}
                  layout="fill"
                  objectFit="cover"
                />
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <h1 className="text-3xl font-bold">{product.name}</h1>
          <p className="text-3xl">{product.description}</p>
          <p className="text-gray-600">
            Price: {product.price.toLocaleString("vi-VN")} ₫
          </p>
        </div>
      </div>

      <SuggestionComponent />
    </div>
  );
}
