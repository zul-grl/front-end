import Image from "next/image";
import Footer from "./_components/Footer";
import Header from "./_components/Header";
import CloudinaryUpload from "./_components/UploadImg";
import Categories from "./_components/Categories";

export default function Home() {
  return (
    <div>
      <Header />
      <Categories />
      {/* <CloudinaryUpload /> */}
      <Footer />
    </div>
  );
}
