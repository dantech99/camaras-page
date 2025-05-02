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
      profileService.updateProfile(user.id, body),
    {
      photographer: true,
      body: t.Object({
        facebookUrl: t.String(),
        instagramUrl: t.String(),
        tiktokUrl: t.String(),
      }),
    }
  )
  .patch(
    "/additional-information",
    ({ profileService, user, body }) =>
      profileService.updateAdditionalInformation(user.id, body),
    {
      photographer: true,
      body: t.Object({
        fullName: t.String(),
        website: t.String(),
        location: t.String(),
        hobbie: t.String(),
      }),
    }
  );
