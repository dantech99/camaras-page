import { betterAuth } from "@camaras/api/src/utils/betteAuthPlugin";
import Elysia from "elysia";
import { photographerModule } from "./photographers.module";

export const photographersRouter = new Elysia({
  prefix: "/photographer",
  name: "photographer",
})
  .use(betterAuth)
  .use(photographerModule)
  .get("/", ({ photographerService }) =>
    photographerService.getAllPhotographers(),
  )
  .get(
    "/my-packages",
    ({ user, photographerService }) =>
      photographerService.getPhotographerPackages(user.id),
    {
      photographer: true,
    },
  );
