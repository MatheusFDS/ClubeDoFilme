const multer = require("multer");
const path = require("path");
const multerDiskStorage = multer.diskStorage({
    destination: (req, file, callback) => {
        const folder = path.join(__dirname, "../public/profile");
        callback(null, folder);
    },
    filename: (req, file, callback) => {
        const imageName = Date.now() + file.originalname
        callback(null, imageName);
    }
});

const upload = multer({storage: multerDiskStorage});

module.exports = upload