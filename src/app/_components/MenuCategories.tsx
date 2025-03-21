"use client";
import Image from "next/image";
import Categories from "./Categories";

const MenuCategories = () => {
  return (
    <div className="w-full flex flex-col">
      <Image
        src="https://res.cloudinary.com/dzb3xzqxv/image/upload/v1739866281/steak_qtjrpd.png"
        alt=""
        width={1000}
        height={1000}
        className="object-cover w-full max-h-[570px]"
      />
      <div className="max-w-[1340px] w-full mx-auto flex flex-col p-5">
        <h2 className="text-2xl font-bold text-white">Categories</h2>
        <Categories />
      </div>
    </div>
  );
};

export default MenuCategories;
