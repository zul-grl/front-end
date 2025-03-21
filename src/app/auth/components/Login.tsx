"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
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
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "sonner";

const formSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

const Login = () => {
  const router = useRouter();
  const onBack = () => router.push("/auth/signup");
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const response = await axios.post(
        "https://food-delivery-back-end-0cz4.onrender.com/auth/sign-in",
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
    <div className="flex flex-col gap-5 p-4 max-w-md mx-auto">
      <Button
        variant="outline"
        size="icon"
        onClick={onBack}
        className="focus:outline-none focus:ring-0"
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>
      <h3 className="text-2xl font-semibold">Log in</h3>
      <p className="text-zinc-500">Log in to enjoy your favorite dishes.</p>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
                    className="focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                  <Input
                    type="password"
                    placeholder="Password"
                    {...field}
                    className="focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-between items-center">
            <Link href="/auth/reset-password">
              <p className="text-blue-600 cursor-pointer hover:underline text-sm">
                Forgot password?
              </p>
            </Link>
          </div>

          <Button
            type="submit"
            className="w-full py-3 mt-4 focus:outline-none focus:ring-0"
          >
            Let&#39;s Go
          </Button>
        </form>
      </Form>

      <div className="flex gap-2 justify-center">
        <p className="text-zinc-500 text-sm">Don&#39;t have an account?</p>
        <Link href="/auth/signup">
          <p className="text-blue-600 hover:underline text-sm">Sign up</p>
        </Link>
      </div>
    </div>
  );
};

export default Login;
