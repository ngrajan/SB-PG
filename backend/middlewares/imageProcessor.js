const path = require("path");
const fs = require("fs/promises");
const sharp = require("sharp");
const catchAsync = require("../utils/catchAsync");

exports.resizeImage = (field, folder, prefix) =>
  catchAsync(async (req, res, next) => {
    let files = [];

    if (req.file) {
      files = [req.file];
    } else if (Array.isArray(req.files)) {
      files = req.files;
    } else if (req.files?.[field]) {
      files = req.files[field];
    }

    if (!files.length) return next();

    const uploadDir = path.join(__dirname, "..", "uploads", folder);

    await fs.mkdir(uploadDir, { recursive: true });

    const filenames = [];

    for (const file of files) {
      file.filename = `${prefix}-${Date.now()}-${Math.random()
        .toString(36)
        .slice(2, 8)}.jpeg`;

      await sharp(file.buffer)
        .resize(500, 500)
        .jpeg({ quality: 90 })
        .toFile(path.join(uploadDir, file.filename));

      filenames.push(file.filename);
    }

    if (files.length === 1) {
      req.body[field] = filenames[0];
    } else {
      req.body[field] = filenames;
    }

    next();
  });
