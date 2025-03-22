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
import { useSearchParams } from "next/navigation";

const changePasswordSchema = z.object({
  newPassword: z.string().min(8, "Password must be at least 8 characters"),
  confirmPassword: z.string().min(8, "Password must be at least 8 characters"),
});

const ChangePassword = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("id");

  const form = useForm<z.infer<typeof changePasswordSchema>>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      newPassword: "",
      confirmPassword: "",
    },
  });

  const handleSubmit = async (values: z.infer<typeof changePasswordSchema>) => {
    try {
      if (values.newPassword !== values.confirmPassword) {
        form.setError("confirmPassword", {
          message: "Passwords do not match",
        });
        return;
      }

      const response = await axios.post(
        "https://food-delivery-back-end-0cz4.onrender.com/auth/reset-password",
        {
          password: values.newPassword,
          token: token,
        }
      );

      if (response) {
        router.push("/auth/login");
      }
    } catch (error) {
      console.error("Error password change:", error);
    }
  };

  return (
    <div className="flex flex-col gap-6 w-full max-w-md">
      <Link href="/auth/login">
        <Button variant="outline" size="icon">
          <ChevronLeft />
        </Button>
      </Link>
      <h3 className="text-2xl font-semibold">Change Password</h3>
      <p className="text-[#71717A]">Enter your new password.</p>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="newPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>New Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="New Password"
                    {...field}
                  />
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
          <Button type="submit" className="w-full">
            Change Password
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default ChangePassword;
