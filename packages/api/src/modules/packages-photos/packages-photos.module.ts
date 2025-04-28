import Elysia from "elysia";
import { PackageService } from "@camaras/api/src/modules/packages-photos/packages-photos.service";

export const packagePhotosModule = new Elysia({
  name: "packages-photos-module",
}).decorate(() => ({
  packagePhotosService: new PackageService(),
}));
