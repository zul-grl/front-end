"use client";
import { useEffect } from "react";
import { useCategory } from "../_context/CategoryContext";
import Image from "next/image";

const Footer = () => {
  const { categories, fetchCategories } = useCategory();
  useEffect(() => {
    fetchCategories();
  }, []);
  return (
    <div className="bg-primary pt-12 w-full">
      <div className="h-[92px] bg-[#EF4444] whitespace-nowrap flex overflow-hidden justify-center items-center w-full">
        <div className="flex gap-7 animate-scroll">
          {Array.from({ length: 14 }, (_, i) => (
            <h2 key={i} className="text-[30px] text-white">
              Fresh fast delivered
            </h2>
          ))}
        </div>
      </div>

      <div className="px-4 md:px-8 lg:px-16 xl:px-[220px] py-12 md:py-[88px]">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          <div className="flex flex-col items-center sm:items-start">
            <Image
              className="w-[46px]"
              src="/logo.png"
              width={100}
              height={100}
              alt="NomNom Logo"
            />
            <div className="mt-2 text-center sm:text-left">
              <div className="flex justify-center sm:justify-start">
                <h4 className="font-semibold text-secondary">Nom</h4>
                <h4 className="text-[#EF4444] font-semibold">Nom</h4>
              </div>
              <p className="text-secondary text-sm">Swift delivery</p>
            </div>
          </div>

          <div className="text-secondary flex flex-col gap-2">
            <p className="text-[#71717A] font-medium">NOMNOM</p>
            <p className="hover:text-[#EF4444] cursor-pointer">Home</p>
            <p className="hover:text-[#EF4444] cursor-pointer">Contact us</p>
            <p className="hover:text-[#EF4444] cursor-pointer">Delivery zone</p>
          </div>

          <div className="text-secondary">
            <p className="text-[#71717A] font-medium mb-2">MENU</p>
            <div className="grid grid-cols-2 gap-x-4 gap-y-2">
              {categories.map((cat) => (
                <p
                  key={cat._id}
                  className="hover:text-[#EF4444] cursor-pointer"
                >
                  {cat.categoryName}
                </p>
              ))}
            </div>
          </div>

          <div>
            <p className="text-[#71717A] font-medium mb-4">FOLLOW US</p>
            <div className="flex gap-4">
              <Image
                className="w-[28px] cursor-pointer hover:opacity-80 transition-opacity"
                src="/face.png"
                width={100}
                height={100}
                alt="Facebook"
              />
              <Image
                className="w-[28px] cursor-pointer hover:opacity-80 transition-opacity"
                src="/instagram.png"
                alt="Instagram"
                width={100}
                height={100}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="px-4 md:px-8 lg:px-16 xl:px-[220px] py-6">
        <div className="border-t border-t-[#71717A] flex flex-col sm:flex-row gap-4 sm:gap-12 pt-4 flex-wrap">
          <p className="text-[#71717A]">Copyright 2024 © Nomnom LLC</p>
          <p className="text-[#71717A] hover:text-[#EF4444] cursor-pointer">
            Privacy policy
          </p>
          <p className="text-[#71717A] hover:text-[#EF4444] cursor-pointer">
            Terms and conditions
          </p>
          <p className="text-[#71717A] hover:text-[#EF4444] cursor-pointer">
            Cookie policy
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
