const path = require("path");
const catchAsync = require("../utils/catchAsync");

const imageProcessor = require("./processors/imageProcessor");
const videoProcessor = require("./processors/videoProcessor");

exports.processMedia = (field, folder, prefix) =>
  catchAsync(async (req, file, next) => {
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

    const processedMedia = [];

    for (const file of files) {
      let media;
      if (file.mimetype.startsWith("image")) {
        media = await imageProcessor.process(file, { uploadDir, prefix });
      } else if (file.mimetype.startsWith("video")) {
        media = await videoProcessor.process(file, { uploadDir, prefix });
      }

      processedMedia.push(media);
    }
    req.body[field] = processedMedia;

    next();
  });
