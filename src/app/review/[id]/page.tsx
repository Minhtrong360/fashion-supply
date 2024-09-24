"use client";

import Image from "next/image";
import Link from "next/link";
import { Search } from "lucide-react";
import ReviewComponent from "@/components/home/Review";

export default function Component() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left Column */}
        <div id="leftColumn" className="lg:w-2/3">
          <div className="px-4">
            <h1 className="text-3xl font-bold mb-6">
              Review: Trải Nghiệm Chụp Ảnh Trung Thu tại Sài Gòn
            </h1>
            <Image
              src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?width=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZmFzaGlvbnxlbnwwfHwwfHx8MA%3D%3D"
              alt="Chụp ảnh Trung Thu"
              width={600}
              height={400}
              className="rounded-lg mb-6"
            />
            <p className="mb-4">
              Tết Trung Thu là dịp tuyệt vời để chụp những bức ảnh đẹp và ý
              nghĩa. Trong bài viết này, chúng tôi sẽ chia sẻ trải nghiệm chụp
              ảnh Trung Thu tại Sài Gòn, cùng với những địa điểm lý tưởng và gợi
              ý trang phục.
            </p>
            <h2 className="text-2xl font-semibold mb-4">
              Địa Điểm Chụp Ảnh Đẹp
            </h2>
            <ul className="list-disc list-inside mb-4">
              <li>Phố lồng đèn Lương Nhữ Học</li>
              <li>Công viên Tao Đàn</li>
              <li>Phố đi bộ Nguyễn Huệ</li>
            </ul>
            <p className="mb-4">
              Mỗi địa điểm đều mang một nét đặc trưng riêng, từ không khí nhộn
              nhịp của phố lồng đèn đến sự yên bình của công viên Tao Đàn.
            </p>
            <h2 className="text-2xl font-semibold mb-4">Gợi Ý Trang Phục</h2>
            <p className="mb-4">
              Áo dài truyền thống hoặc váy đầm với tông màu ấm như đỏ, vàng sẽ
              tạo nên những bức ảnh Trung Thu đẹp mắt và đậm chất Việt Nam.
            </p>
            <Image
              src="https://images.unsplash.com/photo-1509631179647-0177331693ae?width=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8ZmFzaGlvbnxlbnwwfHwwfHx8MA%3D%3D"
              alt="Trang phục Trung Thu"
              width={600}
              height={400}
              className="rounded-lg mb-6"
            />
            <p className="mb-4">
              Hy vọng bài review này sẽ giúp bạn có những trải nghiệm chụp ảnh
              Trung Thu tuyệt vời tại Sài Gòn!
            </p>
          </div>

          <ReviewComponent />
        </div>
        {/* Right Column */}
        <div className="lg:w-1/3 space-y-6 flex-column justify-start items-start">
          <div className="relative">
            <input
              type="text"
              placeholder="Search"
              className="w-full px-4 py-2 border rounded-full"
            />
            <button className="absolute right-3 top-1/2 transform -translate-y-1/2">
              <Search className="h-5 w-5 text-gray-400" />
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
