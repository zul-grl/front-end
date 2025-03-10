import { Button } from "@/components/ui/button";
import Link from "next/link";

const SideBar = () => {
  return (
    <div className="sticky top-0 w-[205px] h-screen flex flex-col gap-10 p-7 items-center bg-white">
      <Link href={"/"}>
        <div className="flex gap-2">
          <img
            className="w-[36px] h-[29px] object-cover"
            src="/logo.png"
            alt=""
          />
          <div>
            <div className="flex">
              <h4 className="font-semibold text-black">NomNom</h4>
            </div>
            <p className="text-[#71717A] text-[12px]">Swift delivery</p>
          </div>
        </div>
      </Link>
      <Link href={"/food-menu"}>
        <Button>Food menu</Button>
      </Link>
      <Link href={"/orders"}>
        <Button>Orders</Button>
      </Link>
      <Link href={"/settings"}>
        <Button>Settings</Button>
      </Link>
    </div>
  );
};
export default SideBar;
