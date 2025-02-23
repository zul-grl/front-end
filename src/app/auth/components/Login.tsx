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

type FormValues = z.infer<typeof formSchema>;

interface LoginProps {
  onNext: () => void;
  onBack: () => void;
}

const Login = ({ onNext, onBack }: LoginProps) => {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: FormValues) => {
    console.log(values); // Log form values (no API call)
    onNext(); // Move to the next step
  };

  return (
    <div className="flex flex-col gap-5 p-4 max-w-md mx-auto">
      <Link href={"/"}>
        <Button variant="outline" size="icon" type="button">
          <ChevronLeft className="h-4 w-4" />
        </Button>{" "}
      </Link>

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

          <Link href="/auth/reset-password">
            <p className="text-blue-600 cursor-pointer hover:underline">
              Forgot password?
            </p>
          </Link>

          <Button type="submit" className="w-full">
            Let's Go
          </Button>
        </form>
      </Form>

      <div className="flex gap-2 justify-center">
        <p className="text-zinc-500">Don't have an account?</p>
        <Link href="/auth/signup">
          <p className="text-blue-600 hover:underline">Sign up</p>
        </Link>
      </div>
    </div>
  );
};

export default Login;
