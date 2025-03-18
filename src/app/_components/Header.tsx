import { ChevronRight, MapPin } from "lucide-react";
import { OrderSheet } from "./OrderDetail";
import Link from "next/link";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export default function HeaderHome() {
  return (
    <div className="w-full bg-[#18181B] flex flex-col sm:flex-row justify-between items-center px-4 sm:px-[88px] py-3 gap-4">
      <div className="flex items-center justify-between w-full h-[44px]">
        <Link href={"/"}>
          <div className="flex items-center gap-3">
            <img className="w-[46px]" src="/logo.png" alt="" />
            <div>
              <div className="flex">
                <p className="text-[20px] font-semibold text-white">Nom</p>
                <p className="text-[20px] font-semibold text-[#EF4444]">Nom</p>
              </div>
              <p className="text-[12px] text-[#f4f4f5] font-normal font-[Inter]">
                Swift delivery
              </p>
            </div>
          </div>
        </Link>
        <div className="flex items-center gap-6">
          <Dialog>
            <DialogTrigger>
              {" "}
              <div className="flex items-center justify-center rounded-full bg-white w-full h-[39px] px-3 py-2 gap-1">
                <MapPin className="text-red-600" />
                <p className="text-red-600">Food delivery</p>
                <span className="font-extrabold text-red-600">:</span>
                <div className="flex justify-between text-[#71717a] gap-3">
                  <p>Add location</p>
                  <ChevronRight />
                </div>
              </div>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Delivery address</DialogTitle>
                <DialogDescription></DialogDescription>
              </DialogHeader>
              <Textarea placeholder="Please provide specific address details such as building number, entrance, and apartment number" />
              <DialogFooter className="justify-end">
                <DialogClose asChild>
                  <Button type="button" variant="secondary">
                    Cancel
                  </Button>
                </DialogClose>
                <Button type="submit">Deliver here</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          <OrderSheet />
        </div>
      </div>
    </div>
  );
}
{
  /* <Link href="/auth/signup">
          <button className="py-2 px-3 bg-secondary rounded-3xl">
            Sign up
          </button>
        </Link>
        <Link href="/auth/login">
          <button className="py-2 px-3 bg-[#EF4444] rounded-3xl">Log in</button>{" "}
        </Link> */
}
