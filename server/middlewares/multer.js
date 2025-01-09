import multer from "multer";

const multerUploads = multer({
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
});

const singleUpload = multerUploads.single("avatar");

export { singleUpload };
