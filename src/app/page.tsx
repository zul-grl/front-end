import Image from "next/image";
import Footer from "./_components/Footer";
import Header from "./_components/Header";
import CloudinaryUpload from "./_components/UploadImg";
import Categories from "./_components/Categories";
import Card from "./_components/Card";

export default function Home() {
  return (
    <div>
      <Header />
      <Categories />
      <Footer />
    </div>
  );
}
