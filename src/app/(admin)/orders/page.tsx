import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { OrderInfo } from "../components/OrderInfo";

const OrderPage = () => {
  return (
    <div className="p-10 h-screen">
      <div className="flex  mb-6 justify-end">
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>
      <div className="w-full">
        <OrderInfo />
      </div>
    </div>
  );
};
export default OrderPage;
