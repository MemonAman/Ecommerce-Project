"use client";

import { usePathname } from 'next/navigation';
import HeaderAndCart from "@/components/HeaderAndCart";

export default function ShopLayoutWrapper({ children, footer }: { children: React.ReactNode, footer: React.ReactNode }) {
  const pathname = usePathname();
  const isAdminPage = pathname?.startsWith('/admin');

  if (isAdminPage) {
    return <>{children}</>;
  }

  return (
    <>
      <HeaderAndCart />
      {children}
      {footer}
    </>
  );
}
