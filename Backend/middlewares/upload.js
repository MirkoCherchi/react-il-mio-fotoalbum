const multer = require("multer");
const path = require("path");

// Configurazione di multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const fieldName = file.fieldname;

    if (req.path === "/auth/register" && req.registerFailed) {
      return cb(null, "");
    }

    let folder = "public/img";
    if (fieldName === "userImg") {
      folder = "public/user";
    }
    cb(null, folder);
  },
  filename: (req, file, cb) => {
    const fileType = path.extname(file.originalname);
    cb(null, String(Date.now()) + fileType);
  },
});

const upload = multer({ storage });

module.exports = upload;
