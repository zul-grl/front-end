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

const resetSchema = z.object({
  email: z.string().email("Invalid email address"),
});

const ResetPassword = () => {
  const router = useRouter();

  const form = useForm<z.infer<typeof resetSchema>>({
    resolver: zodResolver(resetSchema),
    defaultValues: {
      email: "",
    },
  });

  const handleSubmit = async (values: z.infer<typeof resetSchema>) => {
    try {
      const response = await axios.post(
        "https://food-delivery-back-end-r6wt.onrender.com/auth/reset-password-request",
        { email: values.email }
      );
      if (response) {
        router.push("/auth/change-password");
      }
    } catch (error) {
      toast("Invalid user.");
      console.error("Error password reset request:", error);
    }
  };

  return (
    <div className="flex flex-col gap-6 w-full max-w-md">
      <Link href="/auth/login">
        <Button variant="outline" size="icon">
          <ChevronLeft />
        </Button>
      </Link>
      <h3 className="text-2xl font-semibold">Reset Password</h3>
      <p className="text-[#71717A]">Enter your email to reset your password.</p>

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
          <Button type="submit" className="w-full">
            Let&#39;s Go
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default ResetPassword;
