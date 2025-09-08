import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useWithdrawMutation } from "@/redux/features/transaction/transaction.api";
import { useUserInfoQuery } from "@/redux/features/auth/auth.api";

// --- Schema and Type ---
const withdrawSchema = z.object({

  agentEmail: z.email("Enter a valid agent email"),
  amount: z.number().positive("Amount must be a positive number"),
});

type WithdrawForm = z.infer<typeof withdrawSchema>;

// --- Component ---
export default function Withdraw() {
  const [withdraw, { isLoading }] = useWithdrawMutation();
  const { data: userData, isLoading: userDataLoading } = useUserInfoQuery(undefined);

  const form = useForm<WithdrawForm>({
    resolver: zodResolver(withdrawSchema),
    // Corrected default value to be valid according to the schema
    defaultValues: {

      agentEmail: "",
      amount: 1,
    },
  });

  const onSubmit = async (data: WithdrawForm) => {
    if (userDataLoading || !userData?.data?.email) {
      toast.error("User info not loaded. Please try again.");
      return;
    }

    const payload = {
      fromEmail: userData.data.email,
      agentEmail: data.agentEmail,
      amount: data.amount,
    };
    console.log("Submitting payload:", payload);

    try {
      const result = await withdraw(payload).unwrap();
      console.log("Withdraw result:", result);
      toast.success("Money withdrawn successfully!");
      form.reset({ agentEmail: "", amount: 1 });
    } catch (err: any) {
      console.error("Withdraw error:", err);
      toast.error(err?.data?.message || "Failed to withdraw money");
    }
  };

  return (
    <Card className="max-w-md mx-auto shadow-lg rounded-2xl border mt-24">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">Withdraw Money</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            {/* Agent Email Field */}
            <FormField
              control={form.control}
              name="agentEmail"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Agent Email</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="john@example.com"
                      className="w-full border rounded-md px-3 py-2"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Amount Field - Fixed to handle NaN and empty input */}
            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Amount</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="e.g., 500"
                      onChange={(e) => {
                        const value = parseFloat(e.target.value);
                        // If the value is a number, update the field. If it's NaN, set it to null.
                        field.onChange(isNaN(value) ? null : value);
                      }}
                      // Convert the field value to an empty string if it is null/undefined
                      value={field.value ?? ""}
                      className="w-full border rounded-md px-3 py-2"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full"
            >
              {isLoading ? "Withdrawing..." : "Withdraw"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}