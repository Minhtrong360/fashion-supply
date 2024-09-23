import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function AboutUs() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">VỀ CHÚNG TÔI !</h1>

      <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
        <div className="w-full md:w-1/3">
          <Image
            src="/placeholder.svg?height=300&width=300"
            alt="Tiệm Thanh Xuân Logo"
            width={300}
            height={300}
            className="rounded-full mx-auto"
          />
        </div>

        <div className="w-full md:w-2/3">
          <p className="text-lg mb-4">Có ai đó đã từng nói:</p>
          <blockquote className="italic text-gray-600 mb-4">
            Trên thế giới không có gì đẹp đẽ hơn tuổi thanh xuân, cũng không có
            gì quý giá hơn tuổi thanh xuân.
          </blockquote>

          <p className="mb-4">
            Thanh Xuân đẹp vì Chúng ta được sống ngông ngang tắng, tự do thực
            hiện những hoài bão của riêng mình. Là những lần thức xuyên đêm cho
            các dự án và deadline. Thanh Xuân cũng là những chuyến đi với khát
            khao chinh phục và ghi dấu tuổi trẻ.
          </p>

          <p className="mb-4">
            Thanh xuân rồi sẽ trôi qua và tất cả chỉ còn trong hoài niệm và
            những cuốn album xưa cũ. Vậy tại sao Chúng ta không sống hết mình để
            có một thanh xuân rực rỡ và tươi đẹp nhất?
          </p>

          <p className="mb-4">
            Đây chính là bản khoản và là niềm đồng lực để thực hiện Tiệm Thanh
            Xuân ra đời.
          </p>

          <p className="mb-8">
            Với mong muốn góp phần cho những chuyến đi của Bạn thêm ý nghĩa và
            đẹp đẽ hơn. Tiệm Thanh Xuân luôn cập nhật xu hướng thời trang du
            lịch mới nhất, màu mã đa dạng phù hợp với nhiều yêu cầu sống ảo của
            Chị Em.
          </p>
        </div>
      </div>

      <div className="mt-12 bg-gray-100 py-12 px-4 rounded-lg">
        <h2 className="text-2xl font-semibold text-center mb-4">SẢN PHẨM</h2>
        <p className="text-center mb-8">
          Đầy đủ danh mục quần áo, phụ kiện, giày dép để phục vụ Chị Em
        </p>
        <div className="text-center">
          <Link href="/product/category/all">
            <Button variant="default" size="lg">
              Xem tất cả
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
