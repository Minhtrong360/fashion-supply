"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ChevronDown, Menu, ShoppingCart } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import "../app/globals.css";

const menuItems = [
  { title: "Giới thiệu", href: "/gioi-thieu" },
  {
    title: "Sản phẩm",
    href: "/san-pham",
    submenu: [
      { title: "Quần áo", href: "/san-pham/quan-ao" },
      { title: "Phụ kiện", href: "/san-pham/phu-kien" },
    ],
  },
  { title: "Liên hệ", href: "/lien-he" },
];

export default function Header() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [cartItemCount, setCartItemCount] = React.useState(0);
  const pathname = usePathname();

  const handleCartClick = () => {
    console.log("Cart clicked");
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <span className="text-xl font-bold">JunHy</span>
            </Link>
          </div>

          <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
            {menuItems.map((item) =>
              item.submenu ? (
                <div key={item.title} className="relative group">
                  <Button
                    variant="link"
                    className={cn(
                      "text-foreground/60 hover:text-foreground/80 group",
                      pathname.startsWith(item.href) && "text-foreground"
                    )}
                  >
                    {item.title}
                    <ChevronDown className="ml-1 h-4 w-4" />
                  </Button>
                  <div className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-background border border-border opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 ease-in-out">
                    <div className="rounded-md ring-1 ring-black ring-opacity-5 py-1">
                      {item.submenu.map((subItem) => (
                        <Link
                          key={subItem.title}
                          href={subItem.href}
                          className="block px-4 py-2 text-sm text-foreground/60 hover:bg-accent hover:text-accent-foreground"
                        >
                          {subItem.title}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <Link
                  key={item.title}
                  href={item.href}
                  className={cn(
                    "text-foreground/60 transition-colors hover:text-foreground/80",
                    pathname === item.href && "text-foreground"
                  )}
                >
                  {item.title}
                </Link>
              )
            )}
          </nav>

          <div className="flex items-center">
            <Button
              variant="ghost"
              size="icon"
              className="relative"
              onClick={handleCartClick}
              aria-label="Giỏ hàng"
            >
              <ShoppingCart className="h-5 w-5" />
              {cartItemCount > 0 && (
                <Badge
                  variant="destructive"
                  className="absolute -right-2 -top-2 h-6 w-6 rounded-full p-0 text-xs flex items-center justify-center"
                >
                  {cartItemCount}
                </Badge>
              )}
            </Button>

            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  className="ml-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
                >
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="pr-0">
                <MobileLink
                  href="/"
                  className="flex items-center"
                  onOpenChange={setIsOpen}
                >
                  <span className="font-bold">My Store</span>
                </MobileLink>
                <div className="my-4 h-[calc(100vh-8rem)] pb-10 pl-6">
                  <div className="flex flex-col space-y-3">
                    {menuItems.map((item) =>
                      item.submenu ? (
                        <div key={item.title}>
                          <h4 className="font-medium">{item.title}</h4>
                          <div className="ml-4 mt-2 flex flex-col space-y-2">
                            {item.submenu.map((subItem) => (
                              <MobileLink
                                key={subItem.title}
                                href={subItem.href}
                                onOpenChange={setIsOpen}
                              >
                                {subItem.title}
                              </MobileLink>
                            ))}
                          </div>
                        </div>
                      ) : (
                        <MobileLink
                          key={item.title}
                          href={item.href}
                          onOpenChange={setIsOpen}
                        >
                          {item.title}
                        </MobileLink>
                      )
                    )}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}

interface MobileLinkProps extends React.PropsWithChildren {
  href: string;
  onOpenChange?: (open: boolean) => void;
  className?: string;
}

function MobileLink({
  href,
  onOpenChange,
  className,
  children,
}: MobileLinkProps) {
  const router = useRouter();
  return (
    <Link
      href={href}
      onClick={() => {
        router.push(href);
        onOpenChange?.(false);
      }}
      className={cn(className)}
    >
      {children}
    </Link>
  );
}
