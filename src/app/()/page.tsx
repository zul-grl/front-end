import { Suspense } from "react";
import MenuContainer from "../_components/Menu-container";
import MenuCategories from "../_components/MenuCategories";

export default function Home() {
  return (
    <>
      <Suspense>
        <MenuCategories />
        <MenuContainer />
      </Suspense>
    </>
  );
}
