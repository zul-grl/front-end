import Image from "next/image";
export type CardProps = {
  image: string;
  name: string;
  description: string;
  price: number;
  id: number;
  category: string;
};
const Card = ({ image, name, id, description, price }: CardProps) => {
  return (
    <div
      key={id}
      className="p-4  rounded-3xl flex flex-col gap-2 bg-[#FFFFFF] w-[397px] h-[342px]"
    >
      <Image
        alt=""
        width={1000}
        height={1000}
        className="h-[210px] w-[100%] object-cover rounded-2xl"
        src={image}
      />
      <div>
        <div className="flex justify-between">
          <h3 className="text-red-500 font-semibold text-2xl">{name}</h3>
          <h3 className="text-black font-semibold text-xl">{price}</h3>
        </div>
        <p>{description}</p>
      </div>
    </div>
  );
};
export default Card;
