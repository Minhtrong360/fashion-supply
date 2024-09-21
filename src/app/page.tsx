// src/app/page.tsx

import Layout from "./layout";
import Category from "../components/home/Category";
import NewProduct from "../components/home/NewProduct";
import ReviewComponent from "@/components/home/Review";

export default function Home() {
  return (
    <Layout>
      <div className="container mx-auto p-4">
        <Category />
        <NewProduct />
        <ReviewComponent />
      </div>
    </Layout>
  );
}
