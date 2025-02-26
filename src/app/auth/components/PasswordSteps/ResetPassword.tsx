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

const formSchema = z.object({
  email: z.string().email("Invalid email address"),
});

interface ResetPasswordProps {
  onNext: () => void;
  onBack: () => void;
}

const ResetPassword = ({ onNext, onBack }: ResetPasswordProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
    onNext();
  };

  return (
    <div className="flex flex-col gap-5">
      <Button variant="outline" size="icon" onClick={onBack}>
        <ChevronLeft />
      </Button>
      <h3 className="font-semibold text-[24px]">Reset Password</h3>
      <p className="text-[#71717A]">Enter your email to reset your password.</p>
      <Form {...form}>
        <form className="space-y-8">
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
          <Button type="button" onClick={form.handleSubmit(onSubmit)}>
            Let's Go
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default ResetPassword;
