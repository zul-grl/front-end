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

const formSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

interface LoginProps {
  onBack: () => void;
}

const Login = ({ onBack }: LoginProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
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
          <Link href={"/"}>
            {" "}
            <Button
              type="submit"
              className="w-full py-3 mt-4 focus:outline-none focus:ring-0"
            >
              Let's Go
            </Button>
          </Link>
        </form>
      </Form>

      <div className="flex gap-2 justify-center">
        <p className="text-zinc-500 text-sm">Don't have an account?</p>
        <Link href="/auth/signup">
          <p className="text-blue-600 hover:underline text-sm">Sign up</p>
        </Link>
      </div>
    </div>
  );
};

export default Login;
