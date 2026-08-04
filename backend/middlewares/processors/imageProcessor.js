const path = require("path");
const fs = require("fs/promises");
const sharp = require("sharp");

exports.process = async (
  file,
  { uploadDir, prefix, width = 500, height = 500, quality = 90 },
) => {
  await fs.mkdir(uploadDir, { recursive: true });

  const filename = (file.filename = `${prefix}-${Date.now()}-${Math.random()
    .toString(36)
    .slice(2, 8)}.jpeg`);

  const outputPath = path.join(uploadDir, filename);

  await sharp(file.buffer)
    .resize(width, height)
    .jpeg({ quality })
    .toFile(outputPath);

  return {
    type: "image",
    filename,
  };
};
