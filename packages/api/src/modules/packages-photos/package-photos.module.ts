import Elysia from "elysia";
import { PackageService } from "./packager-photos.service";

export const packagePhotosModule = new Elysia({
    name: "packages-photos-module",
})
    .decorate(() => ({
        packageService: new PackageService(),
    }))