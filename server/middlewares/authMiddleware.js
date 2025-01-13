import { adminSecretKey } from "../app.js";
import { Errorhandler } from "../utils/utility.js";
import jwt from "jsonwebtoken";

const isAuthenticated = (req, res, next) => {
  const token = req.cookies["secretToken"];

  if (!token) {
    return next(new Errorhandler("Please login to access this route", 401));
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  req.user = decoded.id;

  next();
};

const isAdmin = (req, res, next) => {
  const token = req.cookies["admin-token"];

  if (!token) {
    return next(new Errorhandler("Only admin can access this route", 401));
  }

  const secretKey = jwt.verify(token, process.env.JWT_SECRET);

  const isMatched = secretKey === adminSecretKey;

  if (!isMatched) {
    return next(new Errorhandler("Invalid secret key", 401));
  }

  next();
};

export { isAuthenticated, isAdmin };
