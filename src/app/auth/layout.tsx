import { Toaster } from "@/components/ui/sonner";
import Image from "next/image";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="p-10 flex gap-20 justify-center w-full h-full">
      <div className="py-12 flex items-center">{children}</div>
      <Toaster />
      <div className="max-w-[1000px] h-[1050px] overflow-hidden rounded-md">
        <Image
          src="https://res.cloudinary.com/dzb3xzqxv/image/upload/v1739866324/delivary_grpogl.jpg"
          alt=""
          className="w-[100%] h-[100%] object-cover"
          width={1000}
          height={1000}
        />
      </div>
    </div>
  );
}
