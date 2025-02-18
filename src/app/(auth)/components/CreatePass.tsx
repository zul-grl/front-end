import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";

const CreatePassword = () => {
  return (
    <div className="flex flex-col gap-5">
      <Button variant="outline" size="icon">
        <ChevronLeft />
      </Button>
      <h3 className="font-semibold text-[24px]">Create your account</h3>
      <p className="text-[#71717A]">Sign up to explore your favorite dishes.</p>
      <Input type="email" placeholder="Password" />
      <Input type="password" placeholder="Confirm" />
      <div className="flex gap-2">
        <Input type="checkbox" />
        <p className="text-[#71717A]">Show password</p>
      </div>
      <Button>Let's Go</Button>
      <div className="flex gap-2">
        <p className="text-[#71717A]">Already have an account?</p>
        <Link href="/Login">
          <p className="text-[#2563EB]">Log in</p>
        </Link>
      </div>
    </div>
  );
};
export default CreatePassword;
