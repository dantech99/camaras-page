"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  signInWithEmailAndPassword,
  signInWithGoogle,
} from "@/utils/api-connection";
import { Button } from "@camaras/ui/src/components/button";
import { Input } from "@camaras/ui/src/components/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@camaras/ui/src/components/form";
import { toast } from "sonner";

import { GoogleIcon } from "@camaras/ui/src/icons/google-icon";

const loginFormSchema = z.object({
  email: z.string().email("El correo electrónico no es válido"),
  password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
});

export function LoginForm() {
  const form = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof loginFormSchema>) {
    const response = await signInWithEmailAndPassword(
      values.email,
      values.password
    );

    if (response.error) {
      toast.error(response.error.message);
    }

    toast.success("Inicio de sesión exitoso");
    form.reset();
    // Redirect to dashboard
    window.location.href = "/dashboard";
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Correo</FormLabel>
              <FormControl>
                <Input placeholder="camaras@mail.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Contraseña</FormLabel>
              <FormControl>
                <Input placeholder="********" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="w-full rounded-full mt-2"
          variant="outline"
        >
          Iniciar Sesión
        </Button>
        <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
          <span className="relative z-10 bg-card px-2 text-muted-foreground">
            O continuar con
          </span>
        </div>
        <Button
          variant="outline"
          onClick={signInWithGoogle}
          className="w-full rounded-full"
        >
          <GoogleIcon />
          Iniciar sesión con Google
        </Button>
      </form>
    </Form>
  );
}
