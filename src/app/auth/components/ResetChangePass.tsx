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
import { useState } from "react";
import axios from "axios";

const resetSchema = z.object({
  email: z.string().email("Invalid email address"),
});

const changePasswordSchema = z.object({
  newPassword: z.string().min(8, "Password must be at least 8 characters"),
  confirmPassword: z.string().min(8, "Password must be at least 8 characters"),
});

const ResetChangePassword = () => {
  const router = useRouter();
  const [step, setStep] = useState<"reset" | "change">("reset");

  const resetForm = useForm<z.infer<typeof resetSchema>>({
    resolver: zodResolver(resetSchema),
    defaultValues: {
      email: "",
    },
  });

  const changePasswordForm = useForm<z.infer<typeof changePasswordSchema>>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      newPassword: "",
      confirmPassword: "",
    },
  });

  const handleResetSubmit = async (values: z.infer<typeof resetSchema>) => {
    const resetForm = {
      email: values.email,
    };
    try {
      const response = await axios.post(
        "http://localhost:4000/auth//reset-password-request",
        resetForm
      );
      if (response) {
        setStep("change");
        return;
      }
    } catch (error) {
      console.error("Error password reset request:", error);
    }
  };

  const handleChangePasswordSubmit = async (
    values: z.infer<typeof changePasswordSchema>
  ) => {
    try {
      if (values.newPassword !== values.confirmPassword) {
        changePasswordForm.setError("confirmPassword", {
          message: "Passwords do not match",
        });
        return;
      }
      const response = await axios.post("http://localhost:4000/reset-password");
      if (response) {
        router.push("/auth/login");
      }
    } catch (error) {
      console.error("Error password change:", error);
    }
  };

  return (
    <div className="flex flex-col gap-5">
      <Link href="/auth/login">
        <Button variant="outline" size="icon">
          <ChevronLeft />
        </Button>
      </Link>
      <h3 className="font-semibold text-[24px]">
        {step === "reset" ? "Reset Password" : "Change Password"}
      </h3>
      <p className="text-[#71717A]">
        {step === "reset"
          ? "Enter your email to reset your password."
          : "Enter your new password."}
      </p>

      {step === "reset" ? (
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
            <Button type="submit">Let's Go</Button>
          </form>
        </Form>
      ) : (
        <Form {...changePasswordForm}>
          <form
            className="space-y-8"
            onSubmit={changePasswordForm.handleSubmit(
              handleChangePasswordSubmit
            )}
          >
            <FormField
              control={changePasswordForm.control}
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
              control={changePasswordForm.control}
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
            <Button type="submit">Change Password</Button>
          </form>
        </Form>
      )}
    </div>
  );
};

export default ResetChangePassword;
