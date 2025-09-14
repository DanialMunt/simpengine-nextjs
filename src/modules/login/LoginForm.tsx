"use client"

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input/input";
import { SubmitHandler, useForm, Controller } from "react-hook-form";

type FormField = {
    email: string;
    password: string
}


export default function LoginForm() {

    const { register, handleSubmit, control, setError, formState: { errors, isSubmitting } } = useForm<FormField>({
        defaultValues: {
            email: "text@gmail.com"
        }
    })

    const onSubmit: SubmitHandler<FormField> = async (data) => {
        try {
            await new Promise((resolve) => setTimeout(resolve, 1000))
          
        } catch (error) {
            setError("root", {
                message: "This email is already taken"
            })
        }

    }
    return (
        <section className="flex w-full flex-col">
            <form action="" className="flex flex-col gap-3" onSubmit={handleSubmit(onSubmit)}>
             
                <Controller
                    name="email"
                    control={control}
                    render={({ field }) => <Input {...field} />} />
           
                {/* <input  {...register("email", {
                    required: "Email is required" 
                })} name="email" type="email" placeholder="email" /> */}
                {errors.email && <div>{errors.email.message}</div>}
                <input {...register("password")} type="password" placeholder="password" />

                <button disabled={isSubmitting} type="submit">
                    {isSubmitting ? "Loading..." : "Submit"}
                </button>
                {errors.root && <div>{errors.root.message}</div>}
            </form>

        </section>
    )
}