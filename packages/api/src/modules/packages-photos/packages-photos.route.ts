import { Prisma } from "@camaras/database/index";
import Elysia, { t } from "elysia";
import { betterAuth } from "src/utils/betteAuthPlugin";
import { packagePhotosModule } from "./package-photos.module";


export const packagesPhotosRouter = new Elysia({
    prefix: "/packages-photos",
    name: "packages-photos",
})
    .use(betterAuth)
    .use(packagePhotosModule)
    .post("/", ({ body, user, packageService }) => packageService.createPackage(body, {
        id: user.id,
    }), {
        photographer: true,
        body: t.Object({
            name: t.String(),
            description: t.String(),
            price: t.Number(),
            photos: t.Array(t.String()),
        })
    })