"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input/input";
import { Button } from "@/components/ui/button";
import { useLogin } from "@/hooks/auth/useAuth";
const loginSchema = z.object({
  login: z.string() //.email("Invalid email address")
  ,
  password: z.string().min(6, "Password must be at least 6 characters"),
});

import { useRouter } from 'next/navigation'

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginForm() {
  const router = useRouter()
  const { mutate: login, isPending } = useLogin();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting,  },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      login: "",
      password: "",
    },
  });

  const onSubmit = (data: LoginFormValues) => {
   login(data, {
      onSuccess: (data) => {
        console.log("Logged in:", data);
        router.push("/dashboard")
       
      },
      onError: (err) => {
        console.error("Login failed:", err.message);
  
      },
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 w-full max-w-sm mx-auto">
      <div>
        <Input
     
          placeholder="Login"
          {...register("login", 
                    { minLength: 10 }
                )}
        />
        {errors.login && (
          <p className="text-red-500 text-sm mt-1">{errors.login.message}</p>
        )}
      </div>

      <div>
        <Input
          type="password"
          placeholder="Password"
          {...register("password")}
        />
        {errors.password && (
          <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
        )}
      </div>

      <Button type="submit" disabled={isPending} className="w-full">
        {isPending ? "Logging in..." : "Login"}
      </Button>
    </form>
  );
}
