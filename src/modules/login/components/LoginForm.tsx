"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useLogin } from "@/hooks/auth/useAuth";
import Image from "next/image";

const loginSchema = z.object({
  login: z.string(),
  password: z.string().min(3, "Password must be at least 3 characters"),
});

import { useRouter } from "next/navigation";
import { Spinner } from "@/components/ui/spinner";
import { toast } from "sonner";
import Link from "next/link";
type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginForm() {
  const router = useRouter();
  const { mutate: login, isPending } = useLogin();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
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
        router.push("/dashboard");
        toast.success("Logged in successfully");
      },
      onError: (error: unknown) => {
        const message =
          error instanceof Error
            ? error.message
            : typeof error === "string"
            ? error
            : "Something went wrong";

        toast.error(message);
      },
    });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4 w-full max-w-sm mx-auto bg-card border p-5 rounded-lg"
    >
      <div className="flex justify-center items-center text-2xl font-bold flex-col ">
        <Image
          className="rounded-lg"
          src="/simpengine-logo.jpg"
          alt="SimpEngine"
          width={150}
          height={150}
        />
        <p>SimpEngine</p>
      </div>
      <div>
        <Input placeholder="Login" {...register("login", { minLength: 10 })} />
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
        {isPending ? <Spinner /> : "Login"}
      </Button>

      <div className="flex gap-1 justify-center">
        <p className="text-sm ">{"Don't have an account?"} </p>
        <Link href="/register" className="text-sm text-primary hover:underline">
          Register
        </Link>
      </div>
    </form>
  );
}
