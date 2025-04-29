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
    ({ body, user, packagePhotosService }) => {
      const descriptionBullets = JSON.parse(body.descriptionBullets);

      return packagePhotosService.createPackage(
        {
          name: body.name,
          description: body.description,
          price: Number(body.price),
          photoCount: Number(body.photoCount),
          image: body.image,
          descriptionBullets,
        },
        user.id
      );
    },
    {
      photographer: true,
      body: t.Object({
        name: t.String(),
        description: t.String(),
        price: t.String(),
        photoCount: t.String(),
        image: t.File({
          format: "image/*",
        }),
        descriptionBullets: t.String(),
      }),
    }
  )
  .patch(
    "/:id",
    ({ params, body, user, packagePhotosService }) => {
      const descriptionBullets = body.descriptionBullets
        ? JSON.parse(body.descriptionBullets)
        : undefined;

      return packagePhotosService.updatePackage(
        params.id,
        {
          name: body.name,
          description: body.description,
          price: Number(body.price),
          photoCount: Number(body.photoCount),
          isActive: body.isActive,
          discountPercentage: body.discountPercentage,
          image: body.image,
          descriptionBullets,
        },
        user.id
      );
    },
    {
      photographer: true,
      body: t.Object({
        name: t.String(),
        description: t.String(),
        price: t.String(),
        photoCount: t.String(),
        image: t.Optional(
          t.File({
            format: "image/*",
          })
        ),
        descriptionBullets: t.Optional(t.String()),
        isActive: t.Optional(t.Boolean()),
        discountPercentage: t.Optional(t.Number()),
      }),
    }
  )
  .delete(
    "/:id",
    ({ params, user, packagePhotosService }) =>
      packagePhotosService.deletePackage(params.id, user.id),
    {
      auth: true,
    }
  );
