import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import Image from "next/image";

const Categories = () => {
  return (
    <div>
      <Image
        src="https://res.cloudinary.com/dzb3xzqxv/image/upload/v1739866281/steak_qtjrpd.png"
        alt=""
        width={1000}
        height={1000}
        className="object-cover w-full max-h-[570px]"
      />
      <div className="max-w-[1440px] flex flex-col">
        <h2>Categories</h2>
        <ToggleGroup type="single" className="flex gap-5">
          <ToggleGroupItem
            className="bg-white text-black rounded-full data-[state=on]:bg-red-500 data-[state=on]:text-white"
            value="Appetizers"
          >
            Appetizers
          </ToggleGroupItem>
          <ToggleGroupItem
            className="bg-white text-black rounded-full data-[state=on]:bg-red-500 data-[state=on]:text-white"
            value="Salads"
          >
            Salads
          </ToggleGroupItem>
          <ToggleGroupItem
            className="bg-white text-black rounded-full data-[state=on]:bg-red-500 data-[state=on]:text-white"
            value="Pizzas"
          >
            Pizzas
          </ToggleGroupItem>
          <ToggleGroupItem
            className="bg-white text-black rounded-full data-[state=on]:bg-red-500 data-[state=on]:text-white"
            value="Lunch"
          >
            Lunch favorites
          </ToggleGroupItem>
          <ToggleGroupItem
            className="bg-white text-black rounded-full data-[state=on]:bg-red-500 data-[state=on]:text-white"
            value="Main"
          >
            Main dishes
          </ToggleGroupItem>
          <ToggleGroupItem
            className="bg-white text-black rounded-full data-[state=on]:bg-red-500 data-[state=on]:text-white"
            value="Fish"
          >
            Fish & Sea foods
          </ToggleGroupItem>
          <ToggleGroupItem
            className="bg-white text-black rounded-full data-[state=on]:bg-red-500 data-[state=on]:text-white"
            value="Side"
          >
            Side dish
          </ToggleGroupItem>
          <ToggleGroupItem
            className="bg-white text-black rounded-full data-[state=on]:bg-red-500 data-[state=on]:text-white"
            value="Brunch"
          >
            Brunch
          </ToggleGroupItem>
          <ToggleGroupItem
            className="bg-white text-black rounded-full data-[state=on]:bg-red-500 data-[state=on]:text-white"
            value="Desserts"
          >
            Desserts
          </ToggleGroupItem>
          <ToggleGroupItem
            className="bg-white text-black rounded-full data-[state=on]:bg-red-500 data-[state=on]:text-white"
            value="Beverages"
          >
            Beverages
          </ToggleGroupItem>
        </ToggleGroup>
      </div>
    </div>
  );
};
export default Categories;
