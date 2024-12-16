import { Elysia } from "elysia";

export const api = new Elysia({
  prefix: "/api",
}).get("/", () => {
  return "Hello world";
});
