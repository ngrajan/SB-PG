const path = require("path");
const fs = require("fs/promises");
const sharp = require("sharp");
const catchAsync = require("./catchAsync");

exports.resizeImage = (field, folder, prefix) =>
  catchAsync(async (req, res, next) => {
    const file = req.files?.[field]?.[0];

    if (!file) return next();

    file.filename = `${prefix}-${Date.now()}.jpeg`; // should work on unique filename(duplicate can be possible because two users upload photos on same time)

    const uploadDir = path.join(__dirname, "..", "uploads", folder);

    await fs.mkdir(uploadDir, { recursive: true });

    await sharp(file.buffer)
      .resize(500, 500)
      .toFormat("jpeg")
      .jpeg({ quality: 90 })
      .toFile(path.join(uploadDir, file.filename));

    req.body[field] = file.filename;

    next();
  });
