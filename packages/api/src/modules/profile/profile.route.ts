import { betterAuth } from "@camaras/api/src/utils/betteAuthPlugin";
import Elysia, { t } from "elysia";
import { profileModule } from "@camaras/api/src/modules/profile/profile.module";

export const profileRouter = new Elysia({
  prefix: "/profile",
  name: "profile",
})
  .use(betterAuth)
  .use(profileModule)
  .get("/", ({ profileService, user }) => profileService.getProfile(user.id), {
    photographer: true,
  })
  .patch(
    "/socials",
    ({ profileService, user, body }) =>
      profileService.updateSocials(user.id, body),
    {
      photographer: true,
      body: t.Object({
        facebookUrl: t.Optional(t.String({})),
        instagramUrl: t.Optional(t.String({})),
        tiktokUrl: t.Optional(t.String({})),
      }),
    }
  )
  .patch(
    "/additional",
    ({ profileService, user, body }) =>
      profileService.updateAdditionalInformation(user.id, body),
    {
      photographer: true,
      body: t.Object({
        nameTag: t.Optional(t.String()),
        website: t.Optional(t.String()),
        location: t.Optional(t.String()),
        phoneNumber: t.Optional(t.String()),
      }),
    }
  )
  .patch(
    "/main",
    ({ profileService, user, body }) =>
      profileService.updateMainInformation(user.id, body),
    {
      photographer: true,
      body: t.Object({
        image: t.Optional(t.File({ format: "image/*" })),
        description: t.Optional(t.String()),
      }),
    }
  );
