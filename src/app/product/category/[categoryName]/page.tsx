"use client";

import ByCategory from "@/components/productPage/ByCategory";
import { useParams } from "next/navigation"; // Import useParams to get the categoryName from the URL

export default function CategoryPage() {
  const params = useParams();
  const categoryName = Array.isArray(params.categoryName)
    ? params.categoryName[0]
    : params.categoryName;

  return (
    <div className="my-8">
      {/* Pass the categoryName as a prop to the ByCategory component */}
      {categoryName && <ByCategory categoryName={categoryName} />}
    </div>
  );
}
