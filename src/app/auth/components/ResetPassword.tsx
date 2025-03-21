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

const ResetChangePassword = () => {
  const router = useRouter();

  const resetForm = useForm<z.infer<typeof resetSchema>>({
    resolver: zodResolver(resetSchema),
    defaultValues: {
      email: "",
    },
  });

  const handleResetSubmit = async (values: z.infer<typeof resetSchema>) => {
    const resetForm = {
      email: values.email,
    };
    try {
      const response = await axios.post(
        "https://food-delivery-back-end-0cz4.onrender.com/auth/reset-password-request",
        resetForm
      );
      if (response) {
        router.push("/auth/change-password");
        return;
      }
    } catch (error) {
      toast("Invalid user.");
      console.error("Error password reset request:", error);
    }
  };

  return (
    <div className="flex flex-col gap-5">
      <Link href="/auth/login">
        <Button variant="outline" size="icon">
          <ChevronLeft />
        </Button>
      </Link>
      <h3 className="font-semibold text-[24px]">Reset Password</h3>
      <p className="text-[#71717A]">Enter your email to reset your password.</p>

      <Form {...resetForm}>
        <form
          className="space-y-8"
          onSubmit={resetForm.handleSubmit(handleResetSubmit)}
        >
          <FormField
            control={resetForm.control}
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
          <Button type="submit">Let&#39;s Go</Button>
        </form>
      </Form>
    </div>
  );
};

export default ResetChangePassword;
