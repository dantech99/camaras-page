"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@camaras/ui/src/components/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@camaras/ui/src/components/form";
import { Input } from "@camaras/ui/src/components/input";
import { toast } from "sonner";

import { signUpWithEmailAndPassword } from "@/utils/auth-connection";

const registerSchema = z.object({
  name: z.string().min(1, "El nombre es obligatorio"),
  email: z.string().email("El correo electrónico no es válido"),
  password: z.string().min(8, "La contraseña debe tener al menos 8 caracteres"),
});

export function RegisterForm() {
  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  async function onSubmit(data: z.infer<typeof registerSchema>) {
    const { name, email, password } = data;

    const response = await signUpWithEmailAndPassword(
      email,
      password,
      name
    );

    if (response.error) {
      toast.error(response.error.message);
    }

    form.reset();
    toast.success("Usuario registrado con éxito");
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nombre Completo</FormLabel>
              <FormControl>
                <Input placeholder="Nombre Completo" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Correo</FormLabel>
              <FormControl>
                <Input placeholder="example@mail.com" {...field} />
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
          Registrarse
        </Button>
      </form>
    </Form>
  );
}
