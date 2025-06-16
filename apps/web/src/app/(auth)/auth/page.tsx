import { ArrowLeftIcon } from "lucide-react"
import { LoginForm } from "@/modules/auth/login-form"
import Link from "next/link"
import { cn } from "@camaras/ui/src/lib/utils"
import { buttonVariants } from "@camaras/ui/src/components/button"

export default function LoginPage() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 px-8 py-9">
        <div className="flex justify-start gap-2">
          <Link href="/" className={cn(buttonVariants({ variant: "landing" }))}>
            <ArrowLeftIcon className="size-4" />
            Volver
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <LoginForm />
          </div>
        </div>
      </div>
      <div className="bg-muted relative hidden lg:block">
        <img
          src="/images/slider-hero/1.webp"
          alt="Image"
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  )
}
