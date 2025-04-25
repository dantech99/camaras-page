import { betterAuth } from "@camaras/api/src/utils/betteAuthPlugin";
import Elysia, { t } from "elysia";
import { packagePhotosModule } from "./packages-photos.module";

export const packagesPhotosRouter = new Elysia({
  prefix: "/packages-photos",
  name: "packages-photos",
})
  .use(betterAuth)
  .use(packagePhotosModule)
  .get(
    "/:id",
    ({ params, packagePhotosService }) =>
      packagePhotosService.getPackagesFromPhotographer(params.id),
    {
      photographer: true,
      params: t.Object({
        id: t.String(),
      }),
    },
  )
  .post(
    "/",
    ({ body, user, packagePhotosService }) =>
      packagePhotosService.createPackage(body, {
        id: user.id,
      }),
    {
      photographer: true,
      body: t.Object({
        name: t.String(),
        description: t.String(),
        dotsDescription: t.Array(t.String()),
        price: t.String(),
        photosCount: t.String(),
        image: t.File({
          format: "image/*",
        }),
      }),
    },
  )
  .patch(
    "/:id",
    ({ params, body, user, packagePhotosService }) =>
      packagePhotosService.updatePackage(params.id, body, {
        id: user.id,
      }),
    {
      photographer: true,
      body: t.Object({
        name: t.String(),
        description: t.String(),
        price: t.Number(),
        dotsDescription: t.Array(t.String()),
        discountPercentage: t.Optional(t.Number()),
        photosCount: t.Number(),
        isActive: t.Optional(t.Boolean()),
      }),
    },
  )
  .delete(
    "/:id",
    ({ params, user, packagePhotosService }) =>
      packagePhotosService.deletePackage(params.id, {
        id: user.id,
      }),
    {
      photographer: true,
      params: t.Object({
        id: t.String(),
      }),
    },
  );
