"use client";
import Image from "next/image";
import Categories from "./Categories";

const MenuCategories = () => {
  return (
    <div className="w-[full flex flex-col">
      <img
        src="https://res.cloudinary.com/dzb3xzqxv/image/upload/v1739866281/steak_qtjrpd.png"
        alt=""
        width={1000}
        height={1000}
        className="object-cover w-[100%] max-h-[570px]"
      />
      <div className="w-[1380px] m-auto">
        <h2>Categories</h2>
        <Categories />
      </div>
    </div>
  );
};

export default MenuCategories;
