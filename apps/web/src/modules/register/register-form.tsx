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

import { FacebookIcon } from "@camaras/ui/src/icons/facebook-icon";
import { GoogleIcon } from "@camaras/ui/src/icons/google-icon";
import { TwitterIcon } from "@camaras/ui/src/icons/twitter-icon";

import { US, MX, ES, FR, DE, IT, GB, BR, CN, IN, JP, KR, RU, AU, AR, PE } from "country-flag-icons/react/3x2";

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
    return (
        <div className="flex flex-col gap-6 mt-4">
            <div className="grid gap-2">
                <Label htmlFor="name">Nombre completo</Label>
                <Input
                    id="name"
                    type="text"
                    placeholder="Juan Pérez"
                    required
                />
            </div>
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
                <Label>Número de teléfono</Label>
                <div className="grid grid-cols-2 gap-2">
                    <Select defaultValue="+52">
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
                    <Input
                        type="tel"
                        placeholder="123 456 7890"
                        required
                        className="w-full"
                    />
                </div>
            </div>
            <div className="grid gap-2">
                <Label htmlFor="password">Contraseña</Label>
                <Input id="password" type="password" required />
            </div>
            <div className="grid gap-2">
                <Label htmlFor="confirm-password">Confirmar contraseña</Label>
                <Input id="confirm-password" type="password" required />
            </div>
            <Button type="submit" className="w-full">
                Registrarse
            </Button>
            <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
                <span className="relative z-10 bg-card px-2 text-muted-foreground">
                    O continuar con
                </span>
            </div>
            <div className="grid grid-cols-3 gap-4">
                <Button variant="outline" className="w-full">
                    <GoogleIcon />
                    <span className="sr-only">Registrarse con Google</span>
                </Button>
                <Button variant="outline" className="w-full">
                    <TwitterIcon />
                    <span className="sr-only">Registrarse con Twitter</span>
                </Button>
                <Button variant="outline" className="w-full">
                    <FacebookIcon />
                    <span className="sr-only">Registrarse con Facebook</span>
                </Button>
            </div>
        </div>
    )
}