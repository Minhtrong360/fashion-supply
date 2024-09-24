"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function Contact() {
  const leftColumnRef = useRef<HTMLDivElement>(null);

  const [activeTab, setActiveTab] = useState("phuNhuan");

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">
        THÔNG TIN LIÊN HỆ - THỜI TRANG JUNHY
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div
          ref={leftColumnRef}
          className="md:col-span-2 space-y-6 md:sticky md:top-0 overflow-hidden"
        >
          <Image
            src="/samhy.png"
            alt="Tiệm Thanh Xuân Logo"
            width={300}
            height={100}
            className="mx-auto"
          />

          <div className="space-y-2">
            <p>
              <strong>Chi nhánh Phú Nhuận:</strong> 16/8 Hoàng Diệu, Phường 10,
              Quận Phú Nhuận, TP. HCM
            </p>
            <p>
              <strong>Hotline bán hàng / tư vấn:</strong> 0956 437 380
            </p>
            <p>
              <strong>Chi nhánh Thủ Đức:</strong> 56 6 Đường D1, Phường Linh
              Tây, Quận Thủ Đức
            </p>
            <p>
              <strong>Hotline bán hàng / tư vấn:</strong> 082 582 6093
            </p>
            <p>
              <strong>Email:</strong> tiemthanhxuan.sg@gmail.com
            </p>
            <p>
              <strong>Hotline góp ý/ khiếu nại:</strong> 0966 05 75 72
            </p>
            <p>
              <strong>Facebook:</strong>{" "}
              <Link href="/" className="text-blue-600 hover:underline">
                Tiệm Thanh Xuân - Cho thuê váy, đầm dự tiệc
              </Link>
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex space-x-4">
              <button
                className={`px-4 py-2 rounded-t-lg ${
                  activeTab === "phuNhuan"
                    ? "bg-primary text-white"
                    : "bg-gray-200"
                }`}
                onClick={() => setActiveTab("phuNhuan")}
              >
                Phú Nhuận
              </button>
              <button
                className={`px-4 py-2 rounded-t-lg ${
                  activeTab === "thuDuc"
                    ? "bg-primary text-white"
                    : "bg-gray-200"
                }`}
                onClick={() => setActiveTab("thuDuc")}
              >
                Thủ Đức
              </button>
            </div>
            {activeTab === "phuNhuan" && (
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.061305964559!2d106.68573731531906!3d10.801684792230743!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317528b6c2f7f2b9%3A0x8b7bb8a7522b3d0!2zMTYvOCBIb8OgbmcgRGnhu4d1LCBQaMaw4budbmcgMTAsIFBow7ogTmh14bqtbiwgVGjDoG5oIHBo4buRIEjhu5MgQ2jDrSBNaW5oLCBWaWV0bmFt!5e0!3m2!1sen!2s!4v1631234567890!5m2!1sen!2s"
                width="100%"
                height="300"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                className="rounded-lg"
              ></iframe>
            )}
            {activeTab === "thuDuc" && (
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.485265409068!2d106.75576631531948!3d10.85087799226941!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3175276398969f7b%3A0x9672b7efd0893fc4!2zNTYgxJDGsOG7nW5nIEQxLCBMaW5oIFTDonksIFRo4bunIMSQ4bupYywgVGjDoG5oIHBo4buRIEjhu5MgQ2jDrSBNaW5oLCBWaWV0bmFt!5e0!3m2!1sen!2s!4v1631234567890!5m2!1sen!2s"
                width="100%"
                height="300"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                className="rounded-lg"
              ></iframe>
            )}
          </div>
        </div>

        <div className="space-y-6 flex-column justify-start items-start">
          <div className="relative">
            <input
              type="text"
              placeholder="Search"
              className="w-full px-4 py-2 border rounded-full"
            />
            <button className="absolute right-3 top-1/2 transform -translate-y-1/2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Bài viết mới</h2>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-blue-600 hover:underline">
                  Top các địa điểm chụp trung thu free ở SG
                </Link>
              </li>
              <li>
                <Link href="#" className="text-blue-600 hover:underline">
                  HOT! Thuê đồ đồng giá 49k
                </Link>
              </li>
              <li>
                <Link href="#" className="text-blue-600 hover:underline">
                  Top địa điểm chụp hoa giấy ở Sài Gòn
                </Link>
              </li>
              <li>
                <Link href="#" className="text-blue-600 hover:underline">
                  Review du lịch Phú Quý 4 ngày 3 đêm
                </Link>
              </li>
              <li>
                <Link href="#" className="text-blue-600 hover:underline">
                  Kinh nghiệm du lịch HN - Mù Cang Chải
                </Link>
              </li>
            </ul>
          </div>

          <Image
            src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?width=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZmFzaGlvbnxlbnwwfHwwfHx8MA%3D%3D"
            alt="Sét váy sweater xanh lá"
            width={300}
            height={400}
            className="rounded-lg"
          />
          <p className="mt-2">Sét váy sweater xanh lá - SA1429</p>

          <Image
            src="https://images.unsplash.com/photo-1509631179647-0177331693ae?width=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8ZmFzaGlvbnxlbnwwfHwwfHx8MA%3D%3D"
            alt="Đầm hoa nhí trắng"
            width={300}
            height={400}
            className="rounded-lg"
          />
          <p className="mt-2">Đầm hoa nhí trắng - DA2023</p>

          <Image
            src="https://images.unsplash.com/photo-1484327973588-c31f829103fe?width=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8ZmFzaGlvbnxlbnwwfHwwfHx8MA%3D%3D"
            alt="Áo khoác denim oversize"
            width={300}
            height={400}
            className="rounded-lg"
          />
          <p className="mt-2">Áo khoác denim oversize - AK0506</p>

          <Image
            src="https://images.unsplash.com/photo-1571513800374-df1bbe650e56?width=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8ZmFzaGlvbnxlbnwwfHwwfHx8MA%3D%3D"
            alt="Chân váy xếp ly đen"
            width={300}
            height={400}
            className="rounded-lg"
          />
          <p className="mt-2">Chân váy xếp ly đen - CV1108</p>
        </div>
      </div>
    </div>
  );
}
