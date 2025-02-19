import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";

const Login = () => {
  return (
    <div className="flex flex-col gap-5">
      <Button variant="outline" size="icon">
        <ChevronLeft />
      </Button>
      <h3 className="font-semibold text-[24px]">Log in </h3>
      <p className="text-[#71717A]">Log in to enjoy your favorite dishes.</p>
      <Input type="email" placeholder="Enter your email address" />
      <Input type="password" placeholder="Password" />
      <p>Forgot password ?</p>
      <Button>Let's Go</Button>
      <div className="flex gap-2">
        <p className="text-[#71717A]">Don’t have an account?</p>
        <Link href={"/auth/signup"}>
          <p className="text-[#2563EB]">Sign up</p>
        </Link>
      </div>
    </div>
  );
};
export default Login;
