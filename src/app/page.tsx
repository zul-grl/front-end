import Image from "next/image";
import Footer from "./_components/Layout/Footer";
import Header from "./_components/Layout/Header";
import Categories from "./_components/ProductContainer/Categories";
import Card from "./_components/FoodDetail/Card";
import MenuContainer from "./_components/ProductContainer/Menu-container";

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
