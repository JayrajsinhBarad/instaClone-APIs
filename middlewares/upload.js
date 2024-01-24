const multer = require("multer");

const imageFilter = (req,file, callback) => {
    if (file.mimetype.startsWith("image")) {
        callback(null, true);
    } else {
        callback("Please upload only images.", false);
    }
}

var storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, '/home/jayraj/Documents/codes/instaClone/static/uploads/');
    },
    filename: (req, file, callback) => {
        callback(null, `${Date.now()}-jack-${file.originalname}`);
    }
});

var uploadFile = multer({ storage: storage, fileFilter: imageFilter });

module.exports = uploadFile;