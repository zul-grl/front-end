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
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Link from "next/link";

const formSchema = z.object({
  email: z.string().email("Invalid email address"),
});

interface EmailProps {
  onNext: () => void;
}

const Email = ({ onNext }: EmailProps) => {
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
      <Link href={"/"}>
        <Button variant="outline" size="icon">
          <ChevronLeft />
        </Button>{" "}
      </Link>
      <h3 className="font-semibold text-[24px]">Create your account</h3>
      <p className="text-[#71717A]">Sign up to explore your favorite dishes.</p>
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
      <div className="flex gap-2">
        <p className="text-[#71717A]">Already have an account?</p>
        <Link href="/auth/login">
          <p className="text-[#2563EB]">Log in</p>
        </Link>
      </div>
    </div>
  );
};

export default Email;
