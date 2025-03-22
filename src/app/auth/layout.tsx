import { Toaster } from "@/components/ui/sonner";
import Image from "next/image";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col lg:flex-row w-full min-h-screen">
      <div className="w-full lg:w-1/2 flex justify-center items-center p-4 md:p-8 lg:p-12">
        <div className="w-full max-w-md">{children}</div>
      </div>
      <div className="hidden lg:flex w-full lg:w-1/2 h-screen relative bg-gray-100">
        <Image
          src="https://res.cloudinary.com/dzb3xzqxv/image/upload/v1739866324/delivary_grpogl.jpg"
          alt="Food delivery service"
          className="object-cover rounded-l-lg"
          fill
          priority
          sizes="(max-width: 768px) 0vw, 50vw"
        />
      </div>
      <Toaster />
    </div>
  );
}
