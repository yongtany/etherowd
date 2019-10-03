const multer = require('multer');
const keys = require('config/keys');

const storage = multer.diskStorage({
  // destination: function(req, file, cb) {
  //   cb(null, './uploads/');
  // },
  filename: function(req, file, cb) {
    cb(null, new Date().toISOString() + file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  // reject a file
  if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg') {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const cloudinary = require('cloudinary');
cloudinary.config({
  cloud_name: 'djs4injum',
  api_key: keys.cloudClientID,
  api_secret: keys.cloudSecret
});

module.exports = {
  upload : multer({
    storage: storage,
    limits : {
      fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
  }),

  cloudinary
}
