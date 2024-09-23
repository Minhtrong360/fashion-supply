"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, ChevronDown } from "lucide-react";
import Image from "next/image";

interface Review {
  id: number;
  title: string;
  description: string;
  image: string;
  link: string;
}

const reviews: Review[] = [
  {
    id: 1,
    title: "HOT! Thuê đồ đồng giá 49k",
    description:
      "Khi thuê 2 bộ bất kì tại Tiệm Thanh Xuân sẽ thuê bộ thứ 3 trong list dưới đây với giá 49k/ngày Hiện tiệm có 2 link FB nhé ....",
    image:
      "https://images.unsplash.com/photo-1485231183945-fffde7cc051e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGZhc2hpb258ZW58MHx8MHx8fDA%3D",
    link: "/review/1",
  },
  {
    id: 2,
    title: "Top địa điểm chụp hoa giấy ở Sài Gòn",
    description:
      "TỔNG HỢP NHỮNG ĐỊA ĐIỂM CHỤP HOA GIẤY Cứ qua tết tầm cuối tháng 2 đầu tháng 3 hoa giấy sẽ nở rộ. Cũng vì thế mà nhiều bạn trẻ...",
    image:
      "https://images.unsplash.com/photo-1485231183945-fffde7cc051e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGZhc2hpb258ZW58MHx8MHx8fDA%3D",
    link: "/review/2",
  },
  {
    id: 3,
    title: "Review du lịch Phú Quý 4 ngày 3 đêm",
    description:
      'Cùng mình ăn chơi "tẹt ga" tại Phú Quý 4 ngày 3 đêm với giá cả rất phải chăng mà phong cảnh, ăn uống ở đây thì khỏi bàn cãi...',
    image:
      "https://images.unsplash.com/photo-1485231183945-fffde7cc051e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGZhc2hpb258ZW58MHx8MHx8fDA%3D",
    link: "/review/3",
  },
  {
    id: 4,
    title: "Khám phá ẩm thực đường phố Hà Nội",
    description:
      "Hà Nội nổi tiếng với nền ẩm thực đa dạng và phong phú. Cùng khám phá những món ăn đường phố ngon nhất của Thủ đô...",
    image:
      "https://images.unsplash.com/photo-1485231183945-fffde7cc051e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGZhc2hpb258ZW58MHx8MHx8fDA%3D",
    link: "/review/4",
  },
  {
    id: 5,
    title: "Top 5 bãi biển đẹp nhất Việt Nam",
    description:
      "Việt Nam tự hào với đường bờ biển dài hơn 3000km, cùng khám phá những bãi biển đẹp nhất mà bạn không thể bỏ qua...",
    image:
      "https://images.unsplash.com/photo-1485231183945-fffde7cc051e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGZhc2hpb258ZW58MHx8MHx8fDA%3D",
    link: "/review/5",
  },
  {
    id: 6,
    title: "Hướng dẫn leo núi Fansipan cho người mới bắt đầu",
    description:
      'Fansipan - "Nóc nhà Đông Dương" là thử thách hấp dẫn cho nhiều người. Cùng tìm hiểu cách chuẩn bị và lên kế hoạch cho chuyến leo núi đầu tiên...',
    image:
      "https://images.unsplash.com/photo-1485231183945-fffde7cc051e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGZhc2hpb258ZW58MHx8MHx8fDA%3D",
    link: "/review/6",
  },
  {
    id: 7,
    title: "Khám phá văn hóa cà phê Sài Gòn",
    description:
      "Sài Gòn không chỉ nổi tiếng với cà phê sữa đá, mà còn có cả một nền văn hóa cà phê độc đáo. Hãy cùng khám phá những quán cà phê đặc biệt nhất...",
    image:
      "https://images.unsplash.com/photo-1485231183945-fffde7cc051e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGZhc2hpb258ZW58MHx8MHx8fDA%3D",
    link: "/review/7",
  },
  {
    id: 8,
    title: "Top 10 món ăn vặt không thể bỏ qua ở Đà Lạt",
    description:
      "Đà Lạt không chỉ nổi tiếng với khí hậu mát mẻ mà còn có nền ẩm thực đường phố phong phú. Cùng khám phá những món ăn vặt ngon nhất...",
    image:
      "https://images.unsplash.com/photo-1485231183945-fffde7cc051e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGZhc2hpb258ZW58MHx8MHx8fDA%3D",
    link: "/review/8",
  },
  {
    id: 9,
    title: "Hướng dẫn du lịch bụi Sapa tiết kiệm",
    description:
      "Sapa là điểm đến hấp dẫn cho nhiều du khách. Cùng tìm hiểu cách du lịch Sapa tiết kiệm nhất mà vẫn trải nghiệm đầy đủ...",
    image:
      "https://images.unsplash.com/photo-1485231183945-fffde7cc051e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGZhc2hpb258ZW58MHx8MHx8fDA%3D",
    link: "/review/9",
  },
  {
    id: 10,
    title: "Review homestay view biển đẹp nhất Vũng Tàu",
    description:
      "Vũng Tàu không chỉ có những bãi biển đẹp mà còn có nhiều homestay view biển tuyệt vời. Cùng điểm qua những homestay đáng ở nhất...",
    image:
      "https://images.unsplash.com/photo-1485231183945-fffde7cc051e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGZhc2hpb258ZW58MHx8MHx8fDA%3D",
    link: "/review/10",
  },
];

export default function ReviewComponent() {
  const [visibleReviews, setVisibleReviews] = useState(3);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const loadMore = () => {
    setVisibleReviews((prevVisible) =>
      Math.min(prevVisible + 3, reviews.length)
    );
  };

  if (!isClient) {
    return null; // Return null on server-side to prevent hydration mismatch
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-6">Review</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reviews.slice(0, visibleReviews).map((review) => (
          <Link href={review.link} key={review.id} className="group">
            <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 transform hover:scale-105">
              <div className="relative">
                <Image
                  src={review.image}
                  alt={review.title}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <ArrowRight className="text-white w-8 h-8" />
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-bold text-lg mb-2">{review.title}</h3>
                <p className="text-gray-600 text-sm">{review.description}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
      <div className="text-center mt-12">
        <button
          onClick={loadMore}
          className={`
            group relative inline-flex items-center justify-center px-8 py-3 
            overflow-hidden font-medium tracking-tighter text-white bg-gray-800 
            rounded-lg hover:bg-gray-700 transition duration-300 ease-out
            ${
              visibleReviews >= reviews.length
                ? "opacity-50 cursor-not-allowed"
                : ""
            }
          `}
          disabled={visibleReviews >= reviews.length}
        >
          <span className="absolute w-0 h-0 transition-all duration-500 ease-out bg-primary rounded-full group-hover:w-56 group-hover:h-56"></span>
          <span className="absolute inset-0 w-full h-full -mt-1 rounded-lg opacity-30 bg-gradient-to-b from-transparent via-transparent to-gray-700"></span>
          <span className="relative flex items-center">
            Xem thêm
            <ChevronDown className="w-4 h-4 ml-2 transition-transform duration-300 ease-in-out group-hover:translate-y-1" />
          </span>
        </button>
      </div>
    </div>
  );
}
