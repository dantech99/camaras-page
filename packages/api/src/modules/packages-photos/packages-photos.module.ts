import Elysia from "elysia";
import { PackageService } from "@camaras/api/src/modules/packages-photos/packages-photos.service";

export const packagePhotosModule = new Elysia({
  name: "packagesPhotosModule",
}).decorate(() => ({
  packagePhotosService: new PackageService(),
}));
