"use client";
import Image from "next/image";
import Categories from "./Categories";

const MenuCategories = () => {
  return (
    <div>
      <div className="max-w-[1440px] flex flex-col">
        <Image
          src="https://res.cloudinary.com/dzb3xzqxv/image/upload/v1739866281/steak_qtjrpd.png"
          alt=""
          width={1000}
          height={1000}
          className="object-cover w-full max-h-[570px]"
        />
        <h2>Categories</h2>
        <Categories />
      </div>
    </div>
  );
};

export default MenuCategories;
