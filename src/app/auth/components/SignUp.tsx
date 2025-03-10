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

const formSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  confirmPassword: z.string().min(8, "Password must be at least 8 characters"),
});

const SignUpPage = () => {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      if (values.password !== values.confirmPassword) {
        form.setError("confirmPassword", {
          type: "manual",
          message: "Passwords do not match",
        });
        return;
      }
      const userData = {
        email: values.email,
        password: values.password,
        role: "USER",
        isVerified: false,
      };

      const response = await fetch("http://localhost:4000/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        router.push("/auth/login");
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to create user");
      }
    } catch (error) {
      console.error("Error during signup:", error);
      form.setError("root", {
        type: "manual",
        message: "An error occurred during signup. Please try again.",
      });
    }
  };

  return (
    <div className="flex flex-col gap-5">
      <Link href="/">
        <Button variant="outline" size="icon">
          <ChevronLeft />
        </Button>
      </Link>
      <h3 className="font-semibold text-[24px]">Create your account</h3>
      <p className="text-[#71717A]">Sign up to explore your favorite dishes.</p>
      <Form {...form}>
        <form className="space-y-8" onSubmit={form.handleSubmit(onSubmit)}>
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

          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Confirm Password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit">Let's Go</Button>
        </form>
      </Form>
      <div className="flex gap-2">
        <p className="text-[#71717A]">Already have an account?</p>
        <Link href="/auth/login">
          <p className="text-[#2563EB]">Log in</p>
        </Link>
      </div>
    </div>
  );
};

export default SignUpPage;
