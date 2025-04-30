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
    "/",
    ({ profileService, user, body }) =>
      profileService.updateProfile(user.id, body),
    {
      photographer: true,
      body: t.Object({
        name: t.String(),
        description: t.String(),
        facebookUrl: t.String(),
        instagramUrl: t.String(),
      }),
    }
  );
