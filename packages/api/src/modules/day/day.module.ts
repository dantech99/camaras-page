import Elysia from "elysia";
import { DayService } from "@camaras/api/src/modules/day/day.service";

export const dayModule = new Elysia({
  name: "dayModule",
}).decorate(() => ({
  dayService: new DayService(),
}));