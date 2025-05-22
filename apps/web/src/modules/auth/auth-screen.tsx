"use client";

import { Card, CardContent } from "@camaras/ui/src/components/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@camaras/ui/src/components/tabs";

import { LoginForm } from "./login-form";
import { RegisterForm } from "./register-form";
import { Button } from "@camaras/ui/src/components/button";
import { GoogleIcon } from "@camaras/ui/src/icons/google-icon";
import { signInWithGoogle } from "@/utils/auth-connection";

export function AuthScreens() {
  return (
    <div className="flex flex-col gap-6">
      <Card className="overflow-hidden p-4 transition-all duration-300 hover:shadow-lg">
        <CardContent className="grid p-0 md:grid-cols-2 gap-4">
          <div className="flex gap-2">
            <Tabs defaultValue="login" className="w-full">
              <TabsList className="grid w-full grid-cols-2 rounded-full">
                <TabsTrigger
                  value="login"
                  className="transition-colors duration-500 rounded-full"
                >
                  Iniciar sesión
                </TabsTrigger>
                <TabsTrigger
                  value="signup"
                  className="transition-colors duration-500 rounded-full"
                >
                  Registrarse
                </TabsTrigger>
              </TabsList>
              <TabsContent
                value="login"
                className="transition-opacity duration-1000 animate-in fade-in space-y-2"
              >
                <LoginForm />
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
              </TabsContent>
              <TabsContent
                value="signup"
                className="transition-opacity duration-1000 animate-in fade-in space-y-2"
              >
                <RegisterForm />
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
              </TabsContent>
            </Tabs>
          </div>
          <div className="relative hidden bg-muted md:block rounded-md overflow-hidden group">
            <img
              src="/images/slider-hero/1.webp"
              alt="Image"
              className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale rounded-md transition-transform duration-700 group-hover:scale-105"
            />
          </div>
        </CardContent>
      </Card>
      <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 [&_a]:transition-colors [&_a]:duration-200 hover:[&_a]:text-primary">
        Al continuar, aceptas nuestros <a href="#">Términos de Servicio</a> y{" "}
        <a href="#">Política de Privacidad</a>.
      </div>
    </div>
  );
}
