const multer = require("multer");
global.__basedir = __dirname + "/..";
const moment = require('moment');

const excelFilter = async (req, file, cb) => {
  if (
    file.mimetype.includes("jpg") ||
    file.mimetype.includes("jpeg") || file.mimetype.includes('png')
  ) {
    cb(null, true);
  } else {
    cb(`Please upload image file with format:(.jpg / .png)`, false);
  }
};


const storage = multer.diskStorage({
  destination: async (req, file, cb) => {
    cb(null, __basedir + "/uploads/logo/");
  },
  filename: (req, file, cb) => {
    cb(null, `${moment().format()
}-vb-${file.originalname}`);
  },
});

const uploadFile = multer({ storage: storage, fileFilter: excelFilter });

module.exports = uploadFile;