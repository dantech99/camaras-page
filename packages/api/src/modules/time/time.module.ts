import Elysia from "elysia";
import { TimeService } from "@camaras/api/src/modules/time/time.service";

export const timeModule = new Elysia({
    name: "timeModule",
}).decorate(() => ({
    timeService: new TimeService(),
}));
    