import {
  GlassesIcon,
  ShirtIcon,
  SunIcon,
  Snowflake,
  Wine,
  Shirt,
  MapPin,
} from "lucide-react";

const categories = [
  { name: "Đầm/Set Maxi Dài", icon: GlassesIcon },
  { name: "Đầm/Set Ngắn", icon: ShirtIcon },
  { name: "Áo/Váy/Quần Lẻ", icon: SunIcon },
  { name: "Đồ Đông", icon: Snowflake },
  { name: "Váy Đi Tiệc", icon: Wine },
  { name: "Áo Dài - Áo Yếm", icon: Shirt },
  { name: "Bikini", icon: MapPin },
  { name: "Local Brand", icon: MapPin },
];

export default function Component() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {categories.map((category, index) => (
          <div
            key={index}
            className="bg-white border border-gray-200 rounded-lg p-4 flex flex-col items-center justify-center text-center hover:shadow-md transition-shadow"
          >
            <category.icon className="w-8 h-8 mb-2" />
            <h3 className="text-sm font-medium">{category.name}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}
