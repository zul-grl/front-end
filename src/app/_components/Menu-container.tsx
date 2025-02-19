import Card, { CardProps } from "@/app/_components/Card";

const MenuContainer = async () => {
  const response = await fetch("http://localhost:4000");
  const data = await response.json();
  return (
    <div className="max-w-[1340px] m-auto grid grid-cols-3 gap-8 p-4">
      {data?.map((item: CardProps) => (
        <Card
          key={item.id}
          image={item.image}
          description={item.description}
          price={item.price}
          id={item.id}
          name={item.name}
        />
      ))}
    </div>
  );
};
export default MenuContainer;
