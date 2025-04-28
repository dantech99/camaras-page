import { betterAuth } from "@camaras/api/src/utils/betteAuthPlugin";
import Elysia, { t } from "elysia";
import { packagePhotosModule } from "@camaras/api/src/modules/packages/packages.module";

export const packagesRouter = new Elysia({
  prefix: "/package",
  name: "packages",
})
  .use(betterAuth)
  .use(packagePhotosModule)
  .get(
    "/",
    ({ packagePhotosService, user }) =>
      packagePhotosService.getPackagesFromPhotographer(user.id),
    {
      photographer: true,
    }
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
        price: t.Number(),
        photosCount: t.Number(),
        image: t.Nullable(
          t.File({
            format: "image/*",
          })
        ),
      }),
    }
  )
  .patch(
    "/:id",
    ({ params, body, user, packagePhotosService }) =>
      packagePhotosService.updatePackage(params.id, body, user.id),
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
    }
  )
  .delete(
    "/:id",
    ({ params, user, packagePhotosService }) =>
      packagePhotosService.deletePackage(params.id, user.id),
    {
      photographer: true,
    }
  );
