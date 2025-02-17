const multer =require("multer");

const storage = multer.memoryStorage();  // first store in RAM
const upload = multer({storage:storage});

module.exports = upload;