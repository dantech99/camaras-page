import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import { authClientVanilla } from "@camaras/auth/client/vanilla";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const session = await authClientVanilla.getSession({
      fetchOptions: {
          headers: await headers(),
          next: {
            revalidate: 0,
          }
      }
  })

  const role = session?.data?.user?.role;

  if (
    (!role || role !== "admin") &&
    (pathname === "/admin" || pathname.startsWith("/admin/"))
  ) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (
    (!role || role !== "photographer") &&
    (pathname === "/photographer" || pathname.startsWith("/photographer/"))
  ) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin", "/photographer"],
};
