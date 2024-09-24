"use client";

import { useState } from "react";
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

interface Product {
  id: number;
  name: string;
  description: string;
  rentalPrice: number;
  images: string[];
  availableQuantity: number;
  totalQuantity: number;
}

interface Rental {
  id: number;
  productId: number;
  productName: string;
  startDate: string;
  endDate: string;
  quantity: number;
  totalCost: number;
  rentalDays: number;
  renterName: string;
  renterPhone: string;
  renterEmail: string;
  deposit: number;
}

export default function Dashboard() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [rentDays, setRentDays] = useState<number>(1);
  const [rentQuantity, setRentQuantity] = useState<number>(1);
  const [renterName, setRenterName] = useState<string>("");
  const [renterPhone, setRenterPhone] = useState<string>("");
  const [renterEmail, setRenterEmail] = useState<string>("");
  const [deposit, setDeposit] = useState<number>(0);
  const [newProduct, setNewProduct] = useState<Omit<Product, "id">>({
    name: "",
    description: "",
    rentalPrice: 0,
    images: [],
    availableQuantity: 0,
    totalQuantity: 0,
  });
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const [products, setProducts] = useState<Product[]>([
    {
      id: 1,
      name: "Set váy croptop chân váy da – SAC424",
      rentalPrice: 50000,
      description: "A stylish crop top and leather skirt set.",
      images: [
        "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZmFzaGlvbnxlbnwwfHwwfHx8MA%3D%3D",
      ],
      availableQuantity: 5,
      totalQuantity: 10,
    },
    {
      id: 2,
      name: "Áo sơ mi trắng cổ đức – ASM221",
      rentalPrice: 30000,
      description: "A classic white shirt with a mandarin collar.",
      images: [
        "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8ZmFzaGlvbnxlbnwwfHwwfHx8MA%3D%3D",
      ],
      availableQuantity: 8,
      totalQuantity: 15,
    },
    {
      id: 3,
      name: "Quần jean ống rộng – QJN332",
      rentalPrice: 40000,
      description: "Wide-leg jeans for a relaxed fit.",
      images: [
        "https://images.unsplash.com/photo-1475180098004-ca77a66827be?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGZhc2hpb258ZW58MHx8MHx8fDA%3D",
      ],
      availableQuantity: 3,
      totalQuantity: 8,
    },
  ]);

  const [rentals, setRentals] = useState<Rental[]>([]);

  // State for managing modal visibility and password validation
  const [isModalVisible, setIsModalVisible] = useState(true); // Initially show the modal
  const [password, setPassword] = useState<string>(""); // Password input state
  const [isPasswordIncorrect, setIsPasswordIncorrect] =
    useState<boolean>(false); // To show error message
  const correctPassword = "samhydangyeu"; // Replace with your actual password

  const handleProductSelect = (product: Product) => {
    setSelectedProduct(product);
    setRentDays(1);
    setRentQuantity(1);
    setCurrentImageIndex(0);
  };

  const handleUpdateProduct = () => {
    if (selectedProduct) {
      const updatedProducts = products.map((p) =>
        p.id === selectedProduct.id ? selectedProduct : p
      );
      setProducts(updatedProducts);
      console.log("Cập nhật sản phẩm:", selectedProduct);
    }
  };

  const handleAddProduct = () => {
    const newId = Math.max(...products.map((p) => p.id)) + 1;
    const productToAdd = { ...newProduct, id: newId };
    setProducts([...products, productToAdd]);
    setNewProduct({
      name: "",
      description: "",
      rentalPrice: 0,
      images: [],
      availableQuantity: 0,
      totalQuantity: 0,
    });
  };

  const handleRent = () => {
    if (selectedProduct) {
      const rentalCost = selectedProduct.rentalPrice * rentDays * rentQuantity;
      const newRental: Rental = {
        id: rentals.length + 1,
        productId: selectedProduct.id,
        productName: selectedProduct.name,
        startDate: new Date().toISOString(),
        endDate: new Date(
          Date.now() + rentDays * 24 * 60 * 60 * 1000
        ).toISOString(),
        quantity: rentQuantity,
        totalCost: rentalCost,
        rentalDays: rentDays,
        renterName,
        renterPhone,
        renterEmail,
        deposit,
      };
      setRentals([...rentals, newRental]);

      const updatedProducts = products.map((p) =>
        p.id === selectedProduct.id
          ? { ...p, availableQuantity: p.availableQuantity - rentQuantity }
          : p
      );
      setProducts(updatedProducts);
      setSelectedProduct({
        ...selectedProduct,
        availableQuantity: selectedProduct.availableQuantity - rentQuantity,
      });

      console.log("Đã thuê sản phẩm:", newRental);
    }
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const newImages = Array.from(files).map((file) =>
        URL.createObjectURL(file)
      );
      if (selectedProduct) {
        setSelectedProduct({
          ...selectedProduct,
          images: [...selectedProduct.images, ...newImages],
        });
      } else {
        setNewProduct({
          ...newProduct,
          images: [...newProduct.images, ...newImages],
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

    // Calculate the difference in milliseconds
    const difference = now.getTime() - start.getTime();

    // Convert milliseconds to days
    const days = Math.floor(difference / (1000 * 60 * 60 * 24));

    // If the difference is less than 1 day, count it as 1 day
    return days >= 1 ? days : 1;
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
                            {product.rentalPrice.toLocaleString()} VND
                          </TableCell>
                          <TableCell>{product.availableQuantity}</TableCell>
                          <TableCell>{product.totalQuantity}</TableCell>
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
                              value={selectedProduct.rentalPrice}
                              onChange={(e) =>
                                setSelectedProduct({
                                  ...selectedProduct,
                                  rentalPrice: parseInt(e.target.value),
                                })
                              }
                            />
                            <Label>Số lượng có sẵn</Label>
                            <Input
                              className="!mb-4"
                              type="number"
                              placeholder="Số lượng có sẵn"
                              value={selectedProduct.availableQuantity}
                              onChange={(e) =>
                                setSelectedProduct({
                                  ...selectedProduct,
                                  availableQuantity: parseInt(e.target.value),
                                })
                              }
                            />
                            <Label>Tổng số lượng</Label>
                            <Input
                              className="!mb-4"
                              type="number"
                              placeholder="Tổng số lượng"
                              value={selectedProduct.totalQuantity}
                              onChange={(e) =>
                                setSelectedProduct({
                                  ...selectedProduct,
                                  totalQuantity: parseInt(e.target.value),
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

                            <Label> Giá thuê/ngày</Label>
                            <Input
                              className="!mb-4"
                              type="number"
                              placeholder="Giá thuê/ngày"
                              value={newProduct.rentalPrice}
                              onChange={(e) =>
                                setNewProduct({
                                  ...newProduct,
                                  rentalPrice: parseInt(e.target.value),
                                })
                              }
                            />

                            <Label> Tổng số lượng</Label>
                            <Input
                              className="!mb-4"
                              type="number"
                              placeholder="Tổng số lượng"
                              value={newProduct.totalQuantity}
                              onChange={(e) =>
                                setNewProduct({
                                  ...newProduct,
                                  totalQuantity: parseInt(e.target.value),
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
                              disabled={product.availableQuantity === 0}
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
                                {product.name} (Còn {product.availableQuantity})
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
                            <Label htmlFor="rentDays">Số ngày thuê</Label>
                            <Input
                              className="!mb-4"
                              id="rentDays"
                              type="number"
                              value={rentDays}
                              onChange={(e) =>
                                setRentDays(parseInt(e.target.value))
                              }
                              min={1}
                            />
                          </div>
                          <div>
                            <Label htmlFor="rentQuantity">Số lượng thuê</Label>
                            <Input
                              className="!mb-4"
                              id="rentQuantity"
                              type="number"
                              value={rentQuantity}
                              onChange={(e) =>
                                setRentQuantity(parseInt(e.target.value))
                              }
                              min={1}
                              max={selectedProduct.availableQuantity}
                            />
                          </div>
                          <div>
                            <Label>Tên người thuê</Label>
                            <Input
                              className="!mb-4"
                              placeholder="Tên người thuê"
                              value={renterName}
                              onChange={(e) => setRenterName(e.target.value)}
                            />
                          </div>
                          <div>
                            <Label>Số điện thoại</Label>
                            <Input
                              className="!mb-4"
                              placeholder="Số điện thoại"
                              value={renterPhone}
                              onChange={(e) => setRenterPhone(e.target.value)}
                            />
                          </div>
                          <div>
                            <Label>Email</Label>
                            <Input
                              className="!mb-4"
                              placeholder="Email"
                              value={renterEmail}
                              onChange={(e) => setRenterEmail(e.target.value)}
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
                              selectedProduct.rentalPrice *
                              rentDays *
                              rentQuantity
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
                          <TableHead>Số ngày đã thuê</TableHead>
                          <TableHead>Số lượng</TableHead>
                          <TableHead>Thành tiền</TableHead>
                          <TableHead>Số tiền đã cọc</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {rentals.map((rental) => (
                          <TableRow key={rental.id}>
                            <TableCell>{rental.id}</TableCell>
                            <TableCell>{rental.productName}</TableCell>
                            <TableCell>{rental.renterName}</TableCell>
                            <TableCell>{rental.renterPhone}</TableCell>
                            <TableCell>{rental.renterEmail}</TableCell>
                            <TableCell>
                              {calculateRentalDays(rental.startDate)}
                            </TableCell>
                            <TableCell>{rental.quantity}</TableCell>
                            <TableCell>
                              {(
                                selectedProduct!.rentalPrice *
                                calculateRentalDays(rental.startDate) *
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
