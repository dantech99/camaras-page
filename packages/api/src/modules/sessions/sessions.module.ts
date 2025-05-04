import Elysia from "elysia";
import { SessionsService } from "@camaras/api/src/modules/sessions/sessions.service";

export const sessionsModule = new Elysia({
  name: "sessionsModule",
}).decorate(() => ({
  sessionsService: new SessionsService(),
}));
