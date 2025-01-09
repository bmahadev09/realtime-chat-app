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

export { isAuthenticated };
