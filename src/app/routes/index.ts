import { Router } from "express";
import { AuthRoutes } from "../modules/Auth/auth.route";
import { UserRoutes } from "../modules/user/user.route";
import { EventRoutes } from "../modules/event/event.route";

const router = Router();

const moduleRoutes = [
  {
    path: "/auth",
    route: AuthRoutes,
  },
  {
    path: "/user",
    route: UserRoutes,
  },
  {
    path: "/event",
    route: EventRoutes,
  }
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
