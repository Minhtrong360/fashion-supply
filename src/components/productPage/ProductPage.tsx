"use client";

import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

// Define the Product type
type Product = {
  id: number;
  name: string;
  price: number;
  images: string[];
};

// Mock product data
const products: Product[] = [
  {
    id: 1,
    name: "Set váy croptop chân váy da – SAC424",
    price: 450000,
    images: [
      "/placeholder.svg?height=600&width=400",
      "/placeholder.svg?height=600&width=400",
    ],
  },
  // Add the rest of your products...
];

export default function ProductPage() {
  const { id } = useParams(); // Get the product id from the URL
  const [product, setProduct] = useState<Product | null>(null); // Product state type is Product or null
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    if (id) {
      // Find the product with the matching ID from the mock data
      const foundProduct = products.find(
        (prod) => prod.id === parseInt(id as string)
      );
      if (foundProduct) {
        setProduct(foundProduct); // Set the found product to state
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
          <p className="text-gray-600">
            Price: {product.price.toLocaleString("vi-VN")} ₫
          </p>
        </div>
      </div>
    </div>
  );
}
