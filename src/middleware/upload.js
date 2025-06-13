import multer from "multer";
import sharp from "sharp";
import path from "path";

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Img upload
const optimizedImg = async (req, res, next) => {
  if (!req.file) return next();
  const filename =
    Date.now() + "-" + req.file.originalname.replace(/\.[^/.]+$/, "") + ".jpeg";
  const outputFilePath = path.join("public/uploads", filename);

  try {
    await sharp(req.file.buffer)
      .resize(460, 250)
      .jpeg({ quality: 80, force: true })
      .toFile(outputFilePath);

    req.file.filename = filename;

    next();
  } catch (error) {
    next(error);
  }
};

export { upload, optimizedImg };
