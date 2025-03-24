"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChevronLeft } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "sonner";

const formSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

const Login = () => {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const response = await axios.post(
        "https://food-delivery-back-end-r6wt.onrender.com/auth/sign-in",
        values
      );
      if (response) {
        router.push("/");
        localStorage.setItem("userId", response.data.user._id);
      }
    } catch (error) {
      toast("Invalid user.");
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col gap-6 w-full max-w-md">
      <Link href="/auth/signup">
        <Button variant="outline" size="icon">
          <ChevronLeft />
        </Button>
      </Link>
      <h3 className="text-2xl font-semibold">Log in</h3>
      <p className="text-[#71717A]">Log in to enjoy your favorite dishes.</p>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="Enter your email address"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="Password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex justify-between items-center">
            <Link href="/auth/reset-password">
              <p className="text-[#2563EB] hover:underline text-sm">
                Forgot password?
              </p>
            </Link>
          </div>
          <Button type="submit" className="w-full">
            Let&#39;s Go
          </Button>
        </form>
      </Form>

      <div className="flex gap-2 justify-center">
        <p className="text-[#71717A]">Don&#39;t have an account?</p>
        <Link href="/auth/signup">
          <p className="text-[#2563EB] hover:underline">Sign up</p>
        </Link>
      </div>
    </div>
  );
};

export default Login;
