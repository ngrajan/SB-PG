const multer = require("multer");
const AppError = require("../utils/appError");

const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) return cb(null, true);
  cb(new AppError("Invalid image type", 400), false);
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

exports.uploadSingle = (field) => upload.single(field);

exports.uploadMultiple = (field, maxCount) => upload.array(field, maxCount);

exports.uploadFields = (fields) => upload.fields(fields);
