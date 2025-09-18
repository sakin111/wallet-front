import { cn } from "@/lib/utils"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Link, useNavigate } from "react-router"
import { useForm, type FieldValues, type SubmitHandler } from "react-hook-form"
import { useLoginMutation } from "@/redux/features/auth/auth.api"
import { toast } from "sonner"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Button } from "@/components/ui/button"

import axios from "axios"


export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const navigate = useNavigate()
  const [login] = useLoginMutation()

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      const res = await login(data).unwrap()
      if (res.success) {
        toast.success("Logged in successfully")
        navigate("/")
      }
    } catch (err: unknown) {
  console.error(err);

  if (axios.isAxiosError(err)) {

    const message = (err.response?.data as { message?: string })?.message;

    if (message === "Password does not match") {
      toast.error("Invalid credentials");
    } else {
      toast.error(message || "Login failed");
    }
  } else {
    // Fallback for non-Axios errors
    toast.error((err as Error)?.message || "Login failed");
  }
}
  }

  return (
    <div className={cn("flex flex-col items-center justify-center min-h-screen p-3 sm:p-4 md:p-6", className)} {...props}>
      <Card className="w-full max-w-xs sm:max-w-sm md:max-w-md shadow-md">
        <CardHeader className="text-center px-4 sm:px-6">
          <CardTitle className="text-xl sm:text-2xl font-semibold">Login to your account</CardTitle>
          <CardDescription className="text-sm sm:text-base">
            Enter your email and password to continue
          </CardDescription>
        </CardHeader>
        <CardContent className="px-4 sm:px-6">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-4 sm:space-y-6"
            >
              {/* Email */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm sm:text-base">Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="john@example.com"
                        className="h-10 sm:h-11 text-sm sm:text-base"
                        {...field}
                        value={field.value || ""}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Password */}
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm sm:text-base">Password</FormLabel>
                    <FormControl>
                       <Input
                      type="password"
                      placeholder="********"
                      className="h-10 sm:h-11 text-sm sm:text-base"
                      {...field}
                      value={field.value || ""}
                    />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />


              <Button type="submit" className="w-full h-10 sm:h-11 text-sm sm:text-base">
                Login
              </Button>

              <div className="text-center text-xs sm:text-sm">
                Don&apos;t have an account?{" "}
                <Link to="/register" className="underline hover:text-primary">
                  Sign Up
                </Link>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}