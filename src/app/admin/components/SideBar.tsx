import { Button } from "@/components/ui/button";

const SideBar = () => {
  return (
    <div className="flex flex-col items-center">
      <div className="flex">
        <img className="w-[46px]" src="/logo.png" alt="" />
        <div>
          <div className="flex">
            <h4 className="font-semibold text-black">NomNom</h4>
          </div>
          <p className="text-[#71717A] text-sm">Swift delivery</p>
        </div>
      </div>
      <Button>Food menu</Button>
      <Button>Orders</Button>
      <Button>Settings</Button>
    </div>
  );
};
export default SideBar;
