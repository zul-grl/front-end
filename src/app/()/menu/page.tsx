import Categories from "@/app/_components/Categories";
import MenuContainer from "@/app/_components/Menu-container";
import { Suspense } from "react";

const MenuPage = () => {
  return (
    <div>
      <Suspense>
        <Categories />
        <MenuContainer />
      </Suspense>
    </div>
  );
};
export default MenuPage;
