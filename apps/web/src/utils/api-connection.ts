import type { Api } from "@camaras/api/src";
import { treaty } from "@elysiajs/eden";

const apiClient = treaty<Api>(process.env.NEXT_PUBLIC_BACKEND_URL).api;

apiClient.photographer.index.get();
