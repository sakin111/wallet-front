import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useSendMutation } from "@/redux/features/transaction/transaction.api";
import { useUserInfoQuery } from "@/redux/features/auth/auth.api";
import { toast } from "sonner";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Button,
  Group,
  Input,
  Label,
  NumberField,
} from "react-aria-components";
import { MinusIcon, PlusIcon } from "lucide-react";
import axios from "axios";


const sendMoneySchema = z.object({
  recipient: z.email("Enter a valid email"),
  amount: z
    .number()
    .min(1, "Amount must be greater than 0"),
});

type SendMoneyForm = z.infer<typeof sendMoneySchema>;

// ---------------- Component ----------------
export default function SendMoney() {
  const [send, { isLoading }] = useSendMutation();
  const { data: userData, isLoading: userDataLoading } =
    useUserInfoQuery(undefined);


  const form = useForm<SendMoneyForm>({
    resolver: zodResolver(sendMoneySchema),
    defaultValues: { recipient: "", amount: 1 },
  });

  const onSubmit = async (data: SendMoneyForm) => {
    if (userDataLoading || !userData?.data?.email) {
      toast.error("User info not loaded. Please try again.");
      return;
    }

const payload = {
  fromEmail: userData.data.email,
  toEmail: data.recipient,       
  amount: data.amount,
};


    try {
      const result = await send(payload).unwrap();
      console.log("Send result:", result);
      toast.success("Money sent successfully!");
      form.reset({ recipient: "", amount: 1 });
    } catch (err: unknown) {
     console.error(err);

  if (axios.isAxiosError(err)) {

    const message = (err.response?.data as { message?: string })?.message;

    if (message === "send money error") {
      toast.error("failed to send money");
    } else {
      toast.error(message || "transaction failed");
    }
  } else {
    toast.error((err as Error)?.message || "transaction failed");
  }
}
  }

  return (
    <Card className="max-w-md mx-auto shadow-lg rounded-2xl border mt-24">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">
          Send Money
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-5"
          >
            {/* Recipient */}
            <FormField
              control={form.control}
              name="recipient"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Receiver Email</FormLabel>
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

            {/* Amount with NumberField */}
            <Controller
              name="amount"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Amount</FormLabel>
                  <NumberField
                    {...field}
                    value={field.value ?? 0}
                    onChange={(val) => field.onChange(val)}
                    minValue={1}
                    className="w-full"
                  >
                    <Label>Amount</Label>
                    <Group className="border rounded-md flex items-center overflow-hidden">
                      <Button slot="decrement" className="px-2 py-1 border-r hover:bg-accent">
                        <MinusIcon size={16} />
                      </Button>
                      <Input className="w-full text-center px-3 py-2" />
                      <Button slot="increment" className="px-2 py-1 border-l hover:bg-accent">
                        <PlusIcon size={16} />
                      </Button>
                    </Group>
                  </NumberField>

                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Submit Button */}
            <Button
              type="submit"
              isDisabled={isLoading}
              className="w-full bg-primary text-white rounded-md py-2 hover:opacity-90"
            >
              {isLoading ? "Sending..." : "Send Money"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
