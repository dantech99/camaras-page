import type { Api } from "@camaras/api/src";
import { treaty } from "@elysiajs/eden";

export const apiClient = treaty<Api>(process.env.NEXT_PUBLIC_BACKEND_URL).api;
