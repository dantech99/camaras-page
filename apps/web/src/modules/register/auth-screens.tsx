import { Card, CardContent } from "@camaras/ui/src/components/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@camaras/ui/src/components/tabs"

import { LoginForm } from "./login-form"
import { RegisterForm } from "./register-form"

export function AuthScreens() {
    return (
        <div className="flex flex-col gap-6">
            <Card className="overflow-hidden px-4">
                <CardContent className="grid p-0 md:grid-cols-2 gap-4">
                    <div className="flex gap-2">
                        <Tabs defaultValue="login" className="w-full">
                            <TabsList className="grid w-full grid-cols-2">
                                <TabsTrigger value="login">Iniciar sesión</TabsTrigger>
                                <TabsTrigger value="signup">Registrarse</TabsTrigger>
                            </TabsList>
                            <TabsContent value="login">
                                <LoginForm />
                            </TabsContent>
                            <TabsContent value="signup">
                                <RegisterForm />
                            </TabsContent>
                        </Tabs>
                    </div>
                    <div className="relative hidden bg-muted md:block rounded-md overflow-hidden">
                        <img
                            src="/placeholder.svg"
                            alt="Image"
                            className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale rounded-md"
                        />
                    </div>
                </CardContent>
            </Card>
            <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-primary">
                By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
                and <a href="#">Privacy Policy</a>.
            </div>
        </div>
    )
}
