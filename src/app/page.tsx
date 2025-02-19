import Image from "next/image";
import Footer from "./_components/Footer";
import Header from "./_components/Header";
import CloudinaryUpload from "./_components/UploadImg";
import Categories from "./_components/Categories";
import Card from "./_components/Card";
import MenuContainer from "./_components/Menu-container";

export default function Home() {
  return (
    <div className=" bg-[#404040]">
      <Header />
      <Categories />
      <MenuContainer />
      <Footer />
    </div>
  );
}
