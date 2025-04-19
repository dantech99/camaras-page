"use client"

import { signInWithGoogle } from "@/utils/api-connection";
import { Button } from "@camaras/ui/src/components/button";
import { Input } from "@camaras/ui/src/components/input";
import { Label } from "@camaras/ui/src/components/label";

import { FacebookIcon } from "@camaras/ui/src/icons/facebook-icon";
import { GoogleIcon } from "@camaras/ui/src/icons/google-icon";
import { TwitterIcon } from "@camaras/ui/src/icons/twitter-icon";

import { useRouter } from "next/navigation";

export function LoginForm() {

    const handleSignInWithGoogle = async () => {
        const response = await signInWithGoogle()
    }

    return (
        <div className="flex flex-col gap-6 mt-4">
            <div className="grid gap-2">
                <Label htmlFor="email">Correo electrónico</Label>
                <Input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    required
                />
            </div>
            <div className="grid gap-2">
                <div className="flex items-center">
                    <Label htmlFor="password">Contraseña</Label>
                    <a
                        href="#"
                        className="ml-auto text-sm underline-offset-2 hover:underline"
                    >
                        Olvidaste tu contraseña?
                    </a>
                </div>
                <Input id="password" type="password" required />
            </div>
            <Button type="submit" className="w-full">
                Iniciar sesión
            </Button>
            <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
                <span className="relative z-10 bg-card px-2 text-muted-foreground">
                    O continuar con
                </span>
            </div>
            <div className="grid grid-cols-3 gap-4">
                <Button variant="outline" className="w-full" onClick={handleSignInWithGoogle}>
                    <GoogleIcon />
                    <span className="sr-only">Iniciar sesión con Google</span>
                </Button>
                <Button variant="outline" className="w-full">
                    <TwitterIcon />
                    <span className="sr-only">Iniciar sesión con Twitter</span>
                </Button>
                <Button variant="outline" className="w-full">
                    <FacebookIcon />
                    <span className="sr-only">Iniciar sesión con Facebook</span>
                </Button>
            </div>
        </div>
    )
}