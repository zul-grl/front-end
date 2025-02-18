import Image from "next/image";

const Categories = () => {
  return (
    <div>
      <Image
        src="https://res.cloudinary.com/dzb3xzqxv/image/upload/v1739866281/steak_qtjrpd.png"
        alt="Category Image"
        width={1000}
        height={1000}
        className="object-cover w-full max-h-[570px]"
      />
      <div className="max-w-[1440px]">
        <h2>Categories</h2>
        
      </div>
    </div>
  );
};
export default Categories;
