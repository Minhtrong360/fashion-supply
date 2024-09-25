"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { message, Modal } from "antd"; // Import Ant Design components
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { ChevronLeft, ChevronRight } from "lucide-react";
import supabase from "@/supabase/supabase";
import { UUID } from "crypto";

interface Product {
  id: UUID;
  name: string;
  description: string;
  rental_price: number;
  purchase_price: number; // New field for purchase price
  images: string[];
  available_quantity: number;
  total_quantity: number;
}

interface Rental {
  id: UUID;
  product_id: UUID;
  product_name: string;
  product_price: number;
  start_date: string;
  end_date: string;
  quantity: number;
  total_cost: number;
  rental_days: number;
  renter_name: string;
  renter_phone: string;
  renter_email: string;
  deposit: number;
}

export default function Dashboard() {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [rent_days, setRent_days] = useState<number>(1);
  const [rent_quantity, setRent_quantity] = useState<number>(1);
  const [renter_name, setRenter_name] = useState<string>("");
  const [renter_phone, setRenter_phone] = useState<string>("");
  const [renter_email, setRenter_email] = useState<string>("");
  const [deposit, setDeposit] = useState<number>(0);
  const [newProduct, setNewProduct] = useState<Omit<Product, "id">>({
    name: "",
    description: "",
    purchase_price: 0,
    rental_price: 0,
    images: [],
    available_quantity: 0,
    total_quantity: 0,
  });
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [rentals, setRentals] = useState<Rental[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // State for managing modal visibility and password validation
  const [isModalVisible, setIsModalVisible] = useState(true);
  const [password, setPassword] = useState<string>("");
  const [isPasswordIncorrect, setIsPasswordIncorrect] =
    useState<boolean>(false);
  const correctPassword = "samhydangyeu"; // Replace with your actual password

  // Fetch products from Supabase
  const fetchProducts = async () => {
    setLoading(true);
    const { data, error } = await supabase.from("products").select("*");
    if (error) {
      console.error("Error fetching products:", error);
      message.error("Failed to load products");
    } else {
      setProducts(data || []);
    }
    setLoading(false);
  };

  // Fetch rentals from Supabase
  const fetchRentals = async () => {
    setLoading(true);
    const { data, error } = await supabase.from("rentals").select("*");
    if (error) {
      console.error("Error fetching rentals:", error);
      message.error("Failed to load rentals");
    } else {
      setRentals(data || []); // Update state with the fetched rentals
    }
    setLoading(false);
  };

  // Call the fetchRentals function in useEffect to load rentals when component mounts
  useEffect(() => {
    fetchProducts(); // Fetch products
    fetchRentals(); // Fetch rentals
  }, []);

  const handleProductSelect = (product: Product) => {
    setSelectedProduct(product);
    setRent_days(1);
    setRent_quantity(1);
    setCurrentImageIndex(0);
  };

  const handleUpdateProduct = async () => {
    if (!selectedProduct) return;

    try {
      const { error } = await supabase
        .from("products")
        .update({
          name: selectedProduct.name,
          description: selectedProduct.description,
          purchase_price: selectedProduct.purchase_price, // Add this line

          rental_price: selectedProduct.rental_price,
          images: selectedProduct.images,
          available_quantity: selectedProduct.available_quantity,
          total_quantity: selectedProduct.total_quantity,
        })
        .eq("id", selectedProduct.id); // Ensure we're updating the correct product by ID

      if (error) {
        console.error("Error updating product:", error);
        message.error("Failed to update product.");
      } else {
        message.success("Product updated successfully.");
        const updatedProducts = products.map((p) =>
          p.id === selectedProduct.id ? selectedProduct : p
        );
        setProducts(updatedProducts); // Update the local state with the updated product
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddProduct = async () => {
    // Explicitly cast the return type as Product[]
    const { data, error } = await supabase
      .from("products")
      .insert([
        {
          name: newProduct.name,
          description: newProduct.description,
          purchase_price: newProduct.purchase_price, // Add this line
          rental_price: newProduct.rental_price,
          images: newProduct.images,
          available_quantity: newProduct.available_quantity,
          total_quantity: newProduct.total_quantity,
        },
      ])
      .select("*"); // Ensure Supabase returns all columns of the inserted product(s)

    if (error) {
      message.error("Failed to add product.");
    } else if (data && data.length > 0) {
      // Check if data exists and contains at least one item
      message.success("Product added successfully.");
      setProducts([...products, { id: data[0].id, ...newProduct }]); // Update local state with the new product
      setNewProduct({
        name: "",
        description: "",
        purchase_price: 0,
        rental_price: 0,
        images: [],
        available_quantity: 0,
        total_quantity: 0,
      });
    }
  };

  const handleRent = async () => {
    if (selectedProduct) {
      const rentalCost =
        selectedProduct.rental_price * rent_days * rent_quantity;
      const newRental: Omit<Rental, "id"> = {
        product_id: selectedProduct.id,
        product_name: selectedProduct.name,
        product_price: selectedProduct.rental_price,
        start_date: new Date().toISOString(),
        end_date: new Date(
          Date.now() + rent_days * 24 * 60 * 60 * 1000
        ).toISOString(),
        quantity: rent_quantity,
        total_cost: rentalCost,
        rental_days: rent_days,
        renter_name,
        renter_phone,
        renter_email,
        deposit,
      };

      try {
        // Insert rental data into Supabase rentals table
        const { data, error } = await supabase
          .from("rentals")
          .insert([
            {
              product_id: newRental.product_id,
              product_name: newRental.product_name,
              renter_name: newRental.renter_name,
              renter_phone: newRental.renter_phone,
              renter_email: newRental.renter_email,
              quantity: newRental.quantity,
              total_cost: newRental.total_cost,
              start_date: newRental.start_date,
              end_date: newRental.end_date,
              deposit: newRental.deposit,
              paid_in_full: false, // default to false initially
            },
          ])
          .select("*"); // Select all fields to get the generated `id`

        if (error) {
          message.error("Failed to rent product.");
          console.error("Error saving rental:", error);
        } else if (data && data.length > 0) {
          message.success("Rental saved successfully.");

          // Add the new rental with the automatically generated ID
          setRentals([...rentals, data[0]]);

          const updatedProducts = products.map((p) =>
            p.id === selectedProduct.id
              ? {
                  ...p,
                  available_quantity: p.available_quantity - rent_quantity,
                }
              : p
          );
          setProducts(updatedProducts);
          setSelectedProduct({
            ...selectedProduct,
            available_quantity:
              selectedProduct.available_quantity - rent_quantity,
          });
        }
      } catch (err) {
        console.error("Error:", err);
      }
    }
  };

  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = event.target.files;
    if (files) {
      const uploadedImageUrls: string[] = [];

      for (const file of Array.from(files)) {
        const { error } = await supabase.storage
          .from("product-images")
          .upload(`public/${file.name}`, file); // Adjust path based on your storage settings

        if (error) {
          console.error("Error uploading image:", error);
          message.error("Failed to upload image.");
        } else {
          const imageUrl = supabase.storage
            .from("product-images")
            .getPublicUrl(`public/${file.name}`).data.publicUrl;
          uploadedImageUrls.push(imageUrl);
        }
      }

      if (selectedProduct) {
        setSelectedProduct({
          ...selectedProduct,
          images: [...selectedProduct.images, ...uploadedImageUrls],
        });
      } else {
        setNewProduct({
          ...newProduct,
          images: [...newProduct.images, ...uploadedImageUrls],
        });
      }
    }
  };

  const handleImageNavigation = (direction: "prev" | "next") => {
    if (selectedProduct) {
      const imagesCount = selectedProduct.images.length;
      if (direction === "prev") {
        setCurrentImageIndex(
          (currentImageIndex - 1 + imagesCount) % imagesCount
        );
      } else {
        setCurrentImageIndex((currentImageIndex + 1) % imagesCount);
      }
    }
  };

  const calculateRentalDays = (startDate: string) => {
    const start = new Date(startDate);
    const now = new Date();

    // Adjust both dates to Vietnam timezone (GMT+7)
    const timeZone = "Asia/Ho_Chi_Minh"; // Vietnam timezone
    const startInVietnam = new Date(
      start.toLocaleString("en-US", { timeZone })
    );
    const nowInVietnam = new Date(now.toLocaleString("en-US", { timeZone }));

    // Set time to 0:00 for both dates
    startInVietnam.setHours(0, 0, 0, 0);
    nowInVietnam.setHours(0, 0, 0, 0);

    // Calculate difference in days
    const differenceInTime = nowInVietnam.getTime() - startInVietnam.getTime();
    const days = Math.floor(differenceInTime / (1000 * 60 * 60 * 24)) + 1;

    return days > 0 ? days : 1;
  };

  // Handle password submission
  const handlePasswordSubmit = () => {
    if (password === correctPassword) {
      setIsModalVisible(false); // Hide modal if password is correct
      setIsPasswordIncorrect(false);
    } else {
      message.error("Wrong password.");
      setIsPasswordIncorrect(true); // Show error message
    }
  };

  const handlePasswordInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  if (loading) {
    return <p>Loading...</p>; // Loading state
  }

  console.log("rentals", rentals);

  return (
    <div>
      {isModalVisible && (
        <Modal
          title="Enter Password"
          open={isModalVisible}
          onCancel={() => setIsModalVisible(true)}
          centered
          footer={null}
        >
          <div>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={handlePasswordInput}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handlePasswordSubmit(); // Trigger the submit function when Enter is pressed
                }
              }}
              className="mt-2"
              placeholder="Enter your password"
            />
            {isPasswordIncorrect && (
              <p className="text-red-500 mt-2">
                Incorrect password, try again.
              </p>
            )}
            <Button
              type="submit"
              onSubmit={handlePasswordSubmit}
              onClick={handlePasswordSubmit}
              className="mt-4"
            >
              Submit
            </Button>
          </div>
        </Modal>
      )}
      {!isModalVisible && (
        <div className="container mx-auto p-4">
          <h1 className="text-3xl font-bold mb-6">
            Dashboard Quản lý Cho Thuê Thời Trang
          </h1>

          <Tabs defaultValue="inventory" className="space-y-4">
            <TabsList>
              <TabsTrigger value="inventory">Quản lý hàng</TabsTrigger>
              <TabsTrigger value="products">Sản phẩm</TabsTrigger>
              <TabsTrigger value="rentals">Quản lý cho thuê</TabsTrigger>
            </TabsList>

            <TabsContent value="inventory">
              <Card>
                <CardHeader>
                  <CardTitle>Quản lý hàng tồn kho</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Hình ảnh</TableHead>
                        <TableHead>Tên sản phẩm</TableHead>
                        <TableHead>Giá nhập sản phẩm</TableHead>{" "}
                        <TableHead>Giá thuê/ngày</TableHead>
                        <TableHead>Số lượng có sẵn</TableHead>
                        <TableHead>Tổng số lượng</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {products.map((product) => (
                        <TableRow key={product.id}>
                          <TableCell>
                            <Image
                              src={product.images[0]}
                              alt={product.name}
                              width={50}
                              height={50}
                              className="rounded-md"
                            />
                          </TableCell>
                          <TableCell>{product.name}</TableCell>
                          <TableCell>
                            {product.purchase_price.toLocaleString()} VND
                          </TableCell>{" "}
                          {/* New column */}
                          <TableCell>
                            {product.rental_price.toLocaleString()} VND
                          </TableCell>
                          <TableCell>{product.available_quantity}</TableCell>
                          <TableCell>{product.total_quantity}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="products">
              <Card>
                <CardHeader>
                  <CardTitle>Cập nhật và thêm sản phẩm</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-semibold mb-2">
                          Danh sách sản phẩm
                        </h3>
                        <Button onClick={() => setSelectedProduct(null)}>
                          Thêm sản phẩm
                        </Button>
                      </div>
                      <ul className="space-y-2">
                        {products.map((product) => (
                          <li key={product.id}>
                            <Button
                              variant="outline"
                              onClick={() => handleProductSelect(product)}
                              className="w-full text-left flex items-center justify-start space-x-2"
                            >
                              <div className="w-8 h-8 flex-shrink-0">
                                <Image
                                  src={product.images[0]}
                                  alt={product.name}
                                  width={30}
                                  height={30}
                                  className="rounded-md w-full h-full object-cover"
                                />
                              </div>
                              <span>{product.name}</span>
                            </Button>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      {selectedProduct ? (
                        <>
                          <h3 className="text-lg font-semibold mb-2">
                            Chi tiết sản phẩm
                          </h3>
                          <div className="space-y-4">
                            <div className="relative">
                              <Image
                                src={selectedProduct.images[currentImageIndex]}
                                alt={selectedProduct.name}
                                width={200}
                                height={200}
                                className="rounded-md"
                              />
                              {selectedProduct.images.length > 1 && (
                                <>
                                  <Button
                                    variant="outline"
                                    size="icon"
                                    className="absolute left-0 top-1/2 transform -translate-y-1/2"
                                    onClick={() =>
                                      handleImageNavigation("prev")
                                    }
                                  >
                                    <ChevronLeft className="h-4 w-4" />
                                  </Button>
                                  <Button
                                    variant="outline"
                                    size="icon"
                                    className="absolute right-0 top-1/2 transform -translate-y-1/2"
                                    onClick={() =>
                                      handleImageNavigation("next")
                                    }
                                  >
                                    <ChevronRight className="h-4 w-4" />
                                  </Button>
                                </>
                              )}
                            </div>
                            <Label>Tên sản phẩm</Label>
                            <Input
                              className="!mb-4"
                              placeholder="Tên sản phẩm"
                              value={selectedProduct.name}
                              onChange={(e) =>
                                setSelectedProduct({
                                  ...selectedProduct,
                                  name: e.target.value,
                                })
                              }
                            />
                            <Label>Giá nhập sản phẩm</Label>
                            <Input
                              className="!mb-4"
                              type="number"
                              placeholder="Giá nhập sản phẩm"
                              value={selectedProduct?.purchase_price || 0}
                              onChange={(e) =>
                                setSelectedProduct({
                                  ...selectedProduct,
                                  purchase_price: parseInt(e.target.value),
                                })
                              }
                            />
                            <Label>Mô tả sản phẩm</Label>
                            <Input
                              className="!mb-4"
                              placeholder="Mô tả sản phẩm"
                              value={selectedProduct.description}
                              onChange={(e) =>
                                setSelectedProduct({
                                  ...selectedProduct,
                                  description: e.target.value,
                                })
                              }
                            />
                            <Label>Giá thuê/ngày</Label>
                            <Input
                              className="!mb-4"
                              type="number"
                              placeholder="Giá thuê/ngày"
                              value={selectedProduct.rental_price}
                              onChange={(e) =>
                                setSelectedProduct({
                                  ...selectedProduct,
                                  rental_price: parseInt(e.target.value),
                                })
                              }
                            />
                            <Label>Số lượng có sẵn</Label>
                            <Input
                              className="!mb-4"
                              type="number"
                              placeholder="Số lượng có sẵn"
                              value={selectedProduct.available_quantity}
                              onChange={(e) =>
                                setSelectedProduct({
                                  ...selectedProduct,
                                  available_quantity: parseInt(e.target.value),
                                })
                              }
                            />
                            <Label>Tổng số lượng</Label>
                            <Input
                              className="!mb-4"
                              type="number"
                              placeholder="Tổng số lượng"
                              value={selectedProduct.total_quantity}
                              onChange={(e) =>
                                setSelectedProduct({
                                  ...selectedProduct,
                                  total_quantity: parseInt(e.target.value),
                                })
                              }
                            />
                            <div>
                              <Label htmlFor="images">Thêm ảnh</Label>
                              <Input
                                id="images"
                                type="file"
                                accept="image/*"
                                multiple
                                onChange={handleImageUpload}
                                className="mt-4"
                              />
                            </div>
                            <Button onClick={handleUpdateProduct}>
                              Cập nhật sản phẩm
                            </Button>
                          </div>
                        </>
                      ) : (
                        <>
                          <h3 className="text-lg font-semibold mb-2">
                            Thêm sản phẩm mới
                          </h3>
                          <div className="space-y-4">
                            <Label> Tên sản phẩm</Label>
                            <Input
                              className="!mb-4"
                              placeholder="Tên sản phẩm"
                              value={newProduct.name}
                              onChange={(e) =>
                                setNewProduct({
                                  ...newProduct,
                                  name: e.target.value,
                                })
                              }
                            />
                            <Label> Mô tả sản phẩm</Label>
                            <Input
                              className="!mb-4"
                              placeholder="Mô tả sản phẩm"
                              value={newProduct.description}
                              onChange={(e) =>
                                setNewProduct({
                                  ...newProduct,
                                  description: e.target.value,
                                })
                              }
                            />

                            <Label> Giá nhập sản phẩm </Label>
                            <Input
                              className="!mb-4"
                              type="number"
                              placeholder="Giá nhập sản phẩm"
                              value={newProduct.purchase_price}
                              onChange={(e) =>
                                setNewProduct({
                                  ...newProduct,
                                  purchase_price: parseInt(e.target.value),
                                })
                              }
                            />
                            <Label> Giá thuê/ngày</Label>
                            <Input
                              className="!mb-4"
                              type="number"
                              placeholder="Giá thuê/ngày"
                              value={newProduct.rental_price}
                              onChange={(e) =>
                                setNewProduct({
                                  ...newProduct,
                                  rental_price: parseInt(e.target.value),
                                })
                              }
                            />

                            <Label> Tổng số lượng</Label>
                            <Input
                              className="!mb-4"
                              type="number"
                              placeholder="Tổng số lượng"
                              value={newProduct.total_quantity}
                              onChange={(e) =>
                                setNewProduct({
                                  ...newProduct,
                                  total_quantity: parseInt(e.target.value),
                                })
                              }
                            />
                            <div>
                              <Label htmlFor="new-images">Thêm ảnh</Label>
                              <Input
                                id="new-images"
                                type="file"
                                accept="image/*"
                                multiple
                                onChange={handleImageUpload}
                                className="mt-4"
                              />
                            </div>
                            <Button onClick={handleAddProduct}>
                              Thêm sản phẩm mới
                            </Button>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="rentals">
              <Card>
                <CardHeader>
                  <CardTitle>Quản lý cho thuê</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h3 className="text-lg font-semibold mb-2">
                        Chọn sản phẩm để cho thuê
                      </h3>

                      <ul className="space-y-2">
                        {products.map((product) => (
                          <li key={product.id}>
                            <Button
                              variant="outline"
                              onClick={() => handleProductSelect(product)}
                              className="w-full text-left flex items-center justify-start space-x-2"
                              disabled={product.available_quantity === 0}
                            >
                              <div className="w-8 h-8 flex-shrink-0">
                                <Image
                                  src={product.images[0]}
                                  alt={product.name}
                                  width={30}
                                  height={30}
                                  className="rounded-md w-full h-full object-cover"
                                />
                              </div>
                              <span>
                                {product.name} (Còn {product.available_quantity}
                                )
                              </span>
                            </Button>
                          </li>
                        ))}
                      </ul>
                    </div>
                    {selectedProduct && (
                      <div>
                        <h3 className="text-lg font-semibold mb-2">
                          Chi tiết thuê
                        </h3>
                        <div className="space-y-4">
                          <Image
                            src={selectedProduct.images[0]}
                            alt={selectedProduct.name}
                            width={200}
                            height={200}
                            className="rounded-md"
                          />
                          <div>
                            <Label htmlFor="rent_days">Số ngày thuê</Label>
                            <Input
                              className="!mb-4"
                              id="rent_days"
                              type="number"
                              value={rent_days}
                              onChange={(e) =>
                                setRent_days(parseInt(e.target.value))
                              }
                              min={1}
                            />
                          </div>
                          <div>
                            <Label htmlFor="rent_quantity">Số lượng thuê</Label>
                            <Input
                              className="!mb-4"
                              id="rent_quantity"
                              type="number"
                              value={rent_quantity}
                              onChange={(e) =>
                                setRent_quantity(parseInt(e.target.value))
                              }
                              min={1}
                              max={selectedProduct.available_quantity}
                            />
                          </div>
                          <div>
                            <Label>Tên người thuê</Label>
                            <Input
                              className="!mb-4"
                              placeholder="Tên người thuê"
                              value={renter_name}
                              onChange={(e) => setRenter_name(e.target.value)}
                            />
                          </div>
                          <div>
                            <Label>Số điện thoại</Label>
                            <Input
                              className="!mb-4"
                              placeholder="Số điện thoại"
                              value={renter_phone}
                              onChange={(e) => setRenter_phone(e.target.value)}
                            />
                          </div>
                          <div>
                            <Label>Email</Label>
                            <Input
                              className="!mb-4"
                              placeholder="Email"
                              value={renter_email}
                              onChange={(e) => setRenter_email(e.target.value)}
                            />
                          </div>
                          <div>
                            <Label>Số tiền đã cọc</Label>
                            <Input
                              className="!mb-4"
                              placeholder="Số tiền đã cọc"
                              type="number"
                              value={deposit}
                              onChange={(e) =>
                                setDeposit(parseInt(e.target.value))
                              }
                            />
                          </div>
                          <div>
                            <strong>Tổng chi phí: </strong>
                            {(
                              selectedProduct.rental_price *
                              rent_days *
                              rent_quantity
                            ).toLocaleString()}{" "}
                            VND
                          </div>
                          <Button onClick={handleRent}>
                            Xác nhận cho thuê
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="mt-8">
                    <h3 className="text-lg font-semibold mb-2">
                      Danh sách cho thuê
                    </h3>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>ID</TableHead>
                          <TableHead>Sản phẩm</TableHead>
                          <TableHead>Tên người thuê</TableHead>
                          <TableHead>Số điện thoại</TableHead>
                          <TableHead>Email</TableHead>
                          <TableHead>Ngày thuê</TableHead>
                          <TableHead className="text-center">
                            Số ngày đã thuê
                          </TableHead>
                          <TableHead className="text-center">
                            Số lượng
                          </TableHead>
                          <TableHead>Thành tiền</TableHead>
                          <TableHead>Số tiền đã cọc</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {rentals.map((rental, index: number) => (
                          <TableRow key={rental.id}>
                            <TableCell>{index + 1}</TableCell>
                            <TableCell>{rental.product_name}</TableCell>
                            <TableCell>{rental.renter_name}</TableCell>
                            <TableCell>{rental.renter_phone}</TableCell>
                            <TableCell>{rental.renter_email}</TableCell>
                            <TableCell>
                              {new Date(rental.start_date).toLocaleDateString(
                                "en-GB",
                                {
                                  day: "2-digit",
                                  month: "2-digit",
                                  year: "numeric",
                                }
                              )}
                            </TableCell>
                            <TableCell className="text-center">
                              {calculateRentalDays(rental.start_date)}
                            </TableCell>
                            <TableCell className="text-center">
                              {rental.quantity}
                            </TableCell>
                            <TableCell>
                              {(
                                rental.product_price *
                                calculateRentalDays(rental.start_date) *
                                rental.quantity
                              ).toLocaleString()}{" "}
                              VND
                            </TableCell>
                            <TableCell>
                              {rental.deposit.toLocaleString()} VND
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      )}
    </div>
  );
}
