import Link from "next/link";
import { Facebook, Instagram, X, Youtube, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Address Column */}
          <div>
            <h3 className="text-lg font-semibold mb-4">ĐỊA CHỈ</h3>
            <p className="text-sm mb-2">
              * 16/8 Hoàng Diệu, Phường 10, Phú Nhuận
            </p>
            <p className="text-sm mb-2">
              * Số 6 đường D1 - Đào Trịnh Nhất, Phường Linh Tây, Thủ Đức
            </p>
            <p className="text-sm italic">
              (Click vào địa chỉ để xem vị trí trên Google map)
            </p>
          </div>

          {/* Hotline Column */}
          <div>
            <h3 className="text-lg font-semibold mb-4">ĐƯỜNG DÂY NÓNG</h3>
            <p className="text-sm mb-2">BÁN HÀNG ( 10:00 - 21:30 )</p>
            <p className="text-sm mb-2">* CN Phú Nhuận: 0896.487.380</p>
            <p className="text-sm mb-2">* CN Thủ Đức: 082.582.6093</p>
            <p className="text-sm mb-2">GÓP Ý ( 10:00 - 21:30 )</p>
            <p className="text-sm">0966 05 75 72</p>
          </div>

          {/* Connect Column */}
          <div>
            <h3 className="text-lg font-semibold mb-4">KẾT NỐI</h3>
            <p className="text-sm mb-4">Hãy kết nối với chúng tôi</p>
            <div className="flex space-x-4">
              <Link href="#" className="text-white hover:text-gray-300">
                <Youtube size={24} />
              </Link>
              <Link href="#" className="text-white hover:text-gray-300">
                <Facebook size={24} />
              </Link>
              <Link href="#" className="text-white hover:text-gray-300">
                <Instagram size={24} />
              </Link>
              <Link href="#" className="text-white hover:text-gray-300">
                <X size={24} />
              </Link>
              <Link href="#" className="text-white hover:text-gray-300">
                <Mail size={24} />
              </Link>
            </div>
          </div>

          {/* Featured Categories Column */}
          <div>
            <h3 className="text-lg font-semibold mb-4">DANH MỤC NỔI BẬT</h3>
            <ul className="text-sm space-y-2">
              <li>
                <Link href="#" className="hover:underline">
                  Đầm
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:underline">
                  Áo
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:underline">
                  Quần - Chân váy
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:underline">
                  Set trang phục
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:underline">
                  Phụ kiện du lịch
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
