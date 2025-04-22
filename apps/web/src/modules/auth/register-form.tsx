"use client"

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@camaras/ui/src/components/button";
import { Input } from "@camaras/ui/src/components/input";
import { Label } from "@camaras/ui/src/components/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@camaras/ui/src/components/select";
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
import { US, MX, ES, FR, DE, IT, GB, BR, CN, IN, JP, KR, RU, AU, AR, PE } from "country-flag-icons/react/3x2";
import { signUpWithEmailAndPassword } from "@/utils/api-connection";

const registerSchema = z.object({
    name: z.string().min(1, "El nombre es obligatorio"),
    email: z.string().email("El correo electrónico no es válido"),
    code: z.string().min(1, "El código de país es obligatorio"),
    phone: z.string().min(1, "El número de teléfono es obligatorio").max(10, "El número de teléfono no puede tener más de 15 caracteres"),
    password: z.string().min(8, "La contraseña debe tener al menos 8 caracteres"),
})


const countries = [
    { code: "+1", name: "Estados Unidos", flag: <US /> },
    { code: "+52", name: "México", flag: <MX /> },
    { code: "+34", name: "España", flag: <ES /> },
    { code: "+33", name: "Francia", flag: <FR /> },
    { code: "+49", name: "Alemania", flag: <DE /> },
    { code: "+39", name: "Italia", flag: <IT /> },
    { code: "+44", name: "Reino Unido", flag: <GB /> },
    { code: "+55", name: "Brasil", flag: <BR /> },
    { code: "+86", name: "China", flag: <CN /> },
    { code: "+91", name: "India", flag: <IN /> },
    { code: "+81", name: "Japón", flag: <JP /> },
    { code: "+82", name: "Corea del Sur", flag: <KR /> },
    { code: "+7", name: "Rusia", flag: <RU /> },
    { code: "+61", name: "Australia", flag: <AU /> },
    { code: "+54", name: "Argentina", flag: <AR /> },
    { code: "+51", name: "Perú", flag: <PE /> },
] as const;

export function RegisterForm() {

    const form = useForm<z.infer<typeof registerSchema>>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            name: "",
            email: "",
            code: "",
            phone: "",
            password: "",
        },
    });

    async function onSubmit(data: z.infer<typeof registerSchema>) {
        const { name, email, code, phone, password } = data;

        const phoneNumber = `${code}${phone}`;
        const response = await signUpWithEmailAndPassword(email, password, name, phoneNumber);

        if (response.error) {
            toast.error(response.error.message);
        }

        toast("Usuario registrado con éxito");
        form.reset();
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Nombre</FormLabel>
                            <FormControl>
                                <Input placeholder="Miguel Velasquez" {...field} />
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

                <div className="grid w-full grid-cols-2 gap-2">
                    <FormField
                        control={form.control}
                        name="code"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Código</FormLabel>
                                <FormControl>
                                    <Select defaultValue="+52" onValueChange={field.onChange} value={field.value}>
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Selecciona país" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {countries.map((country) => (
                                                <SelectItem key={country.code} value={country.code}>
                                                    <span className="flex items-center gap-2">
                                                        <span>{country.flag}</span>
                                                        <span>{country.name}</span>
                                                        <span className="text-muted-foreground">{country.code}</span>
                                                    </span>
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Telefono</FormLabel>
                                <FormControl>
                                    <Input placeholder="" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <Button type="submit" className="w-full rounded-full mt-2" variant="outline">Registrarse</Button>
                <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
                    <span className="relative z-10 bg-card px-2 text-muted-foreground">
                        O continuar con
                    </span>
                </div>
                <Button
                    variant="outline"
                    className="w-full rounded-full"
                >
                    <GoogleIcon />
                    Iniciar sesión con Google
                </Button>
            </form>
        </Form>
    )
}