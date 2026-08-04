const path = require("path");
const fs = require("fs/promises");
const { spawn } = require("child_process");

exports.process = async (file, { uploadDir, prefix }) => {
  await fs.mkdir(uploadDir, { recursive: true });

  const uniqueId = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

  const outputFilename = `${prefix}-${uniqueId}.mp4`;

  const outputPath = path.join(uploadDir, outputFilename);

  // Preserve original extension for the temporary input
  const tempInputPath = path.join(
    uploadDir,
    `${prefix}-${uniqueId}-temp${path.extname(file.originalname)}`,
  );

  // Write Multer's memory buffer to a temporary file
  await fs.writeFile(tempInputPath, file.buffer);

  try {
    await new Promise((resolve, reject) => {
      const ffmpeg = spawn("ffmpeg", [
        "-y",

        "-i",
        tempInputPath,

        // Scale down only if wider than 1280px while keeping aspect ratio
        "-vf",
        "scale='min(1280,iw)':-2",

        // Video codec
        "-c:v",
        "libx264",

        // Compression
        "-preset",
        "medium",

        "-crf",
        "23",

        // Browser compatibility
        "-pix_fmt",
        "yuv420p",

        // Faster web playback
        "-movflags",
        "+faststart",

        // Remove audio
        "-an",

        outputPath,
      ]);

      let errorLog = "";

      ffmpeg.stderr.on("data", (data) => {
        errorLog += data.toString();
      });

      ffmpeg.on("error", reject);

      ffmpeg.on("close", (code) => {
        if (code === 0) {
          resolve();
        } else {
          reject(new Error(`FFmpeg exited with code ${code}\n\n${errorLog}`));
        }
      });
    });

    return {
      type: "video",
      filename: outputFilename,
    };
  } finally {
    // Remove temporary uploaded file
    await fs.unlink(tempInputPath).catch(() => {});
  }
};
