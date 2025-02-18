import Link from "next/link";

const Header = () => {
  return (
    <div className="h-[68px] flex bg-primary justify-between items-center px-[120px]">
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
      <div className="flex gap-3">
        <Link href="/signup">
          <button className="py-2 px-3 bg-secondary rounded-3xl">
            Sign up
          </button>
        </Link>
        <Link href="/login">
          <button className="py-2 px-3 bg-[#EF4444] rounded-3xl">Log in</button>{" "}
        </Link>
      </div>
    </div>
  );
};
export default Header;
