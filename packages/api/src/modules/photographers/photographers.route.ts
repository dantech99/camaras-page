import Elysia from "elysia";
import { betterAuth } from "src/utils/betteAuthPlugin";
import { photographerModule } from "./photographers.module";

export const photographersRouter = new Elysia({
  prefix: "/photographer",
  name: "photographer",
})
  .use(betterAuth)
  .use(photographerModule)
  .get("", ({ photographerService }) =>
    photographerService.getAllPhotographers()
  );
