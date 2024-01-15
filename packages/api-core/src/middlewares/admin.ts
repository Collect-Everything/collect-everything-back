import { UserRole } from "../types/auth";
import { CustomRequestHandler } from "../types/express";

export const adminMiddleware: CustomRequestHandler = (req, res, next) => {
  const user = req.user;

  const isAuthRoute = req.path.includes("/auth");

  if ((user && user.roles?.includes(UserRole.ADMIN)) || isAuthRoute) {
    next();
    return;
  }

  res.status(401).json({ message: "Unauthorized" });
};
