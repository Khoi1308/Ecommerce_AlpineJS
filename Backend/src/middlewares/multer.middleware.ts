import multer from "multer";
import path from "path";
import fs from "fs";

const uploadDir = "products/";
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}
const storage = multer.diskStorage({
  // destination: function(req, file, cb) {
  //   cb(null, uploadDir);
  // },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

export const upload = multer({ storage: storage });

export const uploadImages = multer({
  storage: storage,
  // Must be image file
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname);

    if (!ext.match(/\.(jpg|png|jpeg)$/)) {
      return cb(new Error("File's type is not supported") as any, false);
    }
    cb(null, true);
  },
  limits: {
    fileSize: 10 * 1024 * 1024,
    files: 10,
  },
});
