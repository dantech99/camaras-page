import { api } from "@camaras/api/src";
import { auth } from "@camaras/auth";
import { Elysia } from "elysia";

const app = api.mount(auth.handler).listen(8080);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
