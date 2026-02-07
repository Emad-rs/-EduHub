import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface AuthRequest extends Request {
  user?: any;
}

export const protect = (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // Get token from header
      token = req.headers.authorization.split(" ")[1];

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET || "secret");

      // Get user from the token
      req.user = (decoded as any).user;

      next();
    } catch (error) {
      console.error("Auth Error:", error);
      res.status(401).json({ message: "غير مصرح لك بالوصول، التوكن غير صالح" });
    }
  }

  if (!token) {
    res.status(401).json({ message: "غير مصرح لك بالوصول، لا يوجد توكن" });
  }
};
