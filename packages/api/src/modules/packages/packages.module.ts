import Elysia from "elysia";
import { PackagesService } from "@camaras/api/src/modules/packages/packages.service";

export const packagePhotosModule = new Elysia({
  name: "packagesModule",
}).decorate(() => ({
  packagePhotosService: new PackagesService(),
}));
