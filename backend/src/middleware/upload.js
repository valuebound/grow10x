const multer = require("multer");
global.__basedir = __dirname + "/..";
const moment = require('moment');

const excelFilter = async (req, file, cb) => {
  if (
    file.mimetype.includes("excel") ||
    file.mimetype.includes("spreadsheetml") || file.mimetype.includes('text/csv')
  ) {
    cb(null, true);
  } else {
    cb(`Please upload only excel file with format:(.xslx / .csv)`, false);
  }
};

const storage = multer.diskStorage({
  destination: async (req, file, cb) => {
    cb(null, __basedir + "/uploads/ExcelSheets/");
  },
  filename: (req, file, cb) => {
    cb(null, `${moment().format()
}-vb-${file.originalname}`);
  },
});

const uploadFile = multer({ storage: storage, fileFilter: excelFilter });

module.exports = uploadFile;