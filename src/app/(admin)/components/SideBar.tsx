import { Button } from "@/components/ui/button";

const SideBar = () => {
  return (
    <div className="flex flex-col items-center">
      <div className="flex">
        <img className="w-[46px]" src="/logo.png" alt="" />
        <div>
          <div className="flex">
            <h4 className="font-semibold text-secondary">Nom</h4>
            <h4 className="text-[#EF4444] font-semibold">Nom</h4>
          </div>
          <p className=" text-secondary text-sm">Swift delivery</p>
        </div>
      </div>
      <Button>Food menu</Button>
      <Button>Orders</Button>
      <Button>Settings</Button>
    </div>
  );
};
export default SideBar;
