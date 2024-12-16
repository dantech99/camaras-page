import { Elysia } from "elysia";
import { api } from "@camaras/api/src";

const app = new Elysia().use(api).listen(8080);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
