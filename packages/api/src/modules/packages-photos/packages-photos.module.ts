import Elysia from "elysia";
import { PackageService } from "./packages-photos.service";

export const packagePhotosModule = new Elysia({
  name: "packages-photos-module",
}).decorate(() => ({
  packagePhotosService: new PackageService(),
}));
