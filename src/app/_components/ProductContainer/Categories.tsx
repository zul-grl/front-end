import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import Image from "next/image";
const categories = [
  "Appetizers",
  "Salads",
  "Pizzas",
  "Lunch",
  "Main",
  "Fish",
  "Side",
  "Brunch",
  "Desserts",
  "Beverages",
];
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
          {categories.map((category) => (
            <ToggleGroupItem
              className="bg-white text-black rounded-full data-[state=on]:bg-red-500 data-[state=on]:text-white"
              value={category}
            >
              {category}
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
      </div>
    </div>
  );
};
export default Categories;
