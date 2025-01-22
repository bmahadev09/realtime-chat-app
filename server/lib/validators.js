import { body, check, param, validationResult } from "express-validator";
import { Errorhandler } from "../utils/utility.js";

const validateHandler = (req, res, next) => {
  const errors = validationResult(req);

  const extractedErrors = errors
    .array()
    .map((err) => err.msg)
    .join(", ");

  if (!errors.isEmpty()) {
    return next(new Errorhandler(extractedErrors, 400));
  }

  next();
};

const registerValidation = () => [
  body("name", "Please Enter Name").notEmpty(),
  body("username", "Please Enter Username").notEmpty(),
  body("password", "Please Enter Password").notEmpty(),
  body("bio", "Please Enter Bio").notEmpty(),
];

const loginValidation = () => [
  body("username", "Please Enter Username").notEmpty(),
  body("password", "Please Enter Password").notEmpty(),
];

const newGroupValidation = () => [
  body("name", "Please Enter Name").notEmpty(),
  body("members")
    .notEmpty()
    .withMessage("Please Enter Members")
    .isArray({ min: 2, max: 100 })
    .withMessage("Members must be between 3 and 100"),
];

const addMemberValidation = () => [
  body("chatId", "Please Enter Chat ID").notEmpty(),
  body("members")
    .notEmpty()
    .withMessage("Please Enter Members")
    .isArray({ min: 1, max: 97 })
    .withMessage("Members must be between 1 and 97"),
];

const removeMemberValidation = () => [
  body("chatId", "Please Enter Chat ID").notEmpty(),
  body("userId", "Please Enter User ID").notEmpty(),
];

const sendAttachmentsValidation = () => [
  body("chatId", "Please Enter Chat ID").notEmpty(),
];

const chatIdValidation = () => [param("id", "Please Enter Chat ID").notEmpty()];

const renameGroupValidation = () => [
  param("id", "Please Enter Chat ID").notEmpty(),
  body("name", "Please Enter New Name").notEmpty(),
];

const sendRequestValidation = () => [
  body("userId", "Please Enter User ID").notEmpty(),
];

const acceptRequestValidation = () => [
  body("requestId", "Please Enter Request ID").notEmpty(),
  body("accept")
    .notEmpty()
    .withMessage("Please Accept or Decline Request")
    .isBoolean()
    .withMessage("Accept must be a boolean"),
];

const adminLoginValidation = () => [
  body("secretKey", "Please Enter Secret Key").notEmpty(),
];

export {
  registerValidation,
  validateHandler,
  loginValidation,
  newGroupValidation,
  addMemberValidation,
  removeMemberValidation,
  sendAttachmentsValidation,
  chatIdValidation,
  renameGroupValidation,
  sendRequestValidation,
  acceptRequestValidation,
  adminLoginValidation,
};
