
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useResetPasswordMutation } from "@/redux/features/auth/auth.api";
import { z } from "zod";
import axios from "axios";


const changePasswordSchema = z.object({
  oldPassword: z.string().min(8, "Old password must be at least 8 characters"),
  newPassword: z.string()
    .min(8, "New password must be at least 8 characters")
    .regex(
      /^[A-Za-z0-9]+$/,
      "Password must contain at least one uppercase, one lowercase, and one number"
    ),
});

type ChangePasswordForm = z.infer<typeof changePasswordSchema>;


interface ChangePasswordProps {
  userId: string;
}

export function ChangePassword({ userId }: ChangePasswordProps) {
  const [open, setOpen] = useState(false);
  const [resetPassword, { isLoading }] = useResetPasswordMutation();

  const form = useForm<ChangePasswordForm>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      oldPassword: "",
      newPassword: "",
    },
  });

  const onSubmit = async (data: ChangePasswordForm) => {
    try {
      await resetPassword({
        oldPassword: data.oldPassword,
        newPassword: data.newPassword,
      }).unwrap();
        console.log("Changing password for user:", userId);
      toast.success("Password changed successfully!");
      form.reset();
      setOpen(false);
    } catch (err: unknown) {
      console.error(err);
    
      if (axios.isAxiosError(err)) {
    
        const message = (err.response?.data as { message?: string })?.message;
    
        if (message === "failed to change password") {
          toast.error("failed to change password");
        } else {
          toast.error(message || "failed to change password");
        }
      } else {
    
        toast.error((err as Error)?.message || "failed to change password");
      }
    }
      }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full">Change Password</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Change Password</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-4">
            <FormField
              control={form.control}
              name="oldPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Old Password</FormLabel>
                  <FormControl>
                    <Input {...field} type="password" placeholder="Old Password" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="newPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>New Password</FormLabel>
                  <FormControl>
                    <Input {...field} type="password" placeholder="New Password" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Changing..." : "Change Password"}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
