import { api as server } from "@camaras/api/src";
import { treaty } from '@elysiajs/eden'

export const api = treaty<typeof server>("localhost:8080").api