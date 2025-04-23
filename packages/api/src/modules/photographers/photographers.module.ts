import Elysia from "elysia";
import { PhotographerService } from "./photographers.service";

export const photographerModule = new Elysia({
  name: "photographer-module",
}).decorate(() => ({
  photographerService: new PhotographerService(),
}));
