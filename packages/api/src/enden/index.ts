import type { api as server } from "@camaras/api/src";
import { treaty } from "@elysiajs/eden";

export const api = treaty<server>("localhost:8080").api;
