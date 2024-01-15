import { Request, Response, NextFunction } from "express";

export function validateCustomHeader(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const customHeaderValue = req.header("X-Custom-Header");

  if (!customHeaderValue || customHeaderValue !== "Showcase-data") {
    return res.status(403).json({ error: "Accès refusé." });
  }

  next();
}