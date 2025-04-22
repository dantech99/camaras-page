"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { BadgeCheck, Bell, CreditCard, FileQuestionIcon, LogOut, ShoppingCart, Sparkles } from "lucide-react";

import { Button } from "@camaras/ui/src/components/button";
import { Avatar, AvatarFallback, AvatarImage } from "@camaras/ui/src/components/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@camaras/ui/src/components/dropdown-menu";

import { authClient } from "@camaras/auth/client";
import { useMediaQuery } from "@camaras/ui/src/hooks/use-media-query";

export function DashboardNavbar() {

    const isMobile = useMediaQuery("(max-width: 768px)");
    const { data: session } = authClient.useSession();
    const router = useRouter();

    const handleLogout = async () => {
        await authClient.signOut({
            fetchOptions: {
                onSuccess: () => {
                    router.push("/auth");
                }
            }
        });
    }

    return (
        <nav className="flex items-center justify-between py-4">
            <div className="w-full flex max-w-7xl mx-auto justify-between items-center gap-4">
                <Link href="/" className="flex items-center">
                    <span className="text-2xl font-bold bg-clip-text text-transparent bg-linear-to-r from-cyan-400 to-cyan-600">
                        Logo
                    </span>
                </Link>
                <div className="flex items-center gap-2">
                    <Button size={"icon"}>
                        <Bell />
                    </Button>
                    <Button size={"icon"}>
                        <ShoppingCart />
                    </Button>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <div className="flex items-center gap-2">
                                <Avatar className="h-9 w-9 rounded-full">
                                    <AvatarImage src={session?.user?.image ? session.user.image : undefined} alt={session?.user?.name || ""} />
                                    <AvatarFallback className="rounded-full">{session?.user?.name?.charAt(0)}</AvatarFallback>
                                </Avatar>
                            </div>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg mt-2"
                            side={isMobile ? "bottom" : "bottom"}
                            align="end"
                            sideOffset={4}
                        >
                            <DropdownMenuLabel className="p-0 font-normal">
                                <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                                    <Avatar className="h-8 w-8 rounded-lg">
                                        <AvatarImage src={session?.user?.image ? session.user.image : undefined} alt={session?.user?.name || ""} />
                                        <AvatarFallback className="rounded-lg">{session?.user?.name?.charAt(0)}</AvatarFallback>
                                    </Avatar>
                                    <div className="grid flex-1 text-left text-sm leading-tight">
                                        <span className="truncate font-semibold">{session?.user?.name}</span>
                                        <span className="truncate text-xs">{session?.user?.email}</span>
                                    </div>
                                </div>
                            </DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuGroup>
                                <DropdownMenuItem>
                                    <Sparkles />
                                    Mi cuenta
                                </DropdownMenuItem>
                            </DropdownMenuGroup>
                            <DropdownMenuSeparator />
                            <DropdownMenuGroup>
                                <DropdownMenuItem>
                                    <BadgeCheck />
                                    Verificación
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <CreditCard />
                                    Mis compras
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <FileQuestionIcon />
                                    Preguntas
                                </DropdownMenuItem>
                            </DropdownMenuGroup>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={handleLogout}>
                                <LogOut />
                                Cerrar sesión
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
        </nav>
    )
}