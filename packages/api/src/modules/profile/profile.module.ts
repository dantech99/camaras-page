import Elysia from "elysia";
import { ProfileService } from "@camaras/api/src/modules/profile/profile.service";

export const profileModule = new Elysia({
  name: "profileModule",
}).decorate(() => ({
  profileService: new ProfileService(),
}));
