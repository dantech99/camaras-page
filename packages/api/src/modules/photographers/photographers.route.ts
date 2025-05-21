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
    photographerService.getAllPhotographers()
  )
  .get(
    "/:photographerId",
    ({ params, photographerService }) =>
      photographerService.getPhotographerPackages(params.photographerId)
  )
  .get(
    "/available/:photographerId",
    ({ params, photographerService }) =>
      photographerService.getAvailablePhotographerPackages(params.photographerId)
  )
