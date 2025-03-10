import Image from "next/image";
import Footer from "../_components/Footer";
import Header from "../_components/Header";
import MenuContainer from "../_components/Menu-container";
import MenuCategories from "../_components/MenuCategories";

export default function Home() {
  return (
    <>
      <MenuCategories />
      <MenuContainer />
    </>
  );
}
