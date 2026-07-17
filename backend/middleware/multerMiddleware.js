const multer = require("multer");
const path = require("path");

const uploadDir = path.join(__dirname, "../public/uploads");


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/uploads');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); // Use the original filename
  }
});


const upload = multer({ storage: storage });


module.exports = upload;




// const multer = require("multer");


// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//       cb(null, "../public/uploads")
//     },
//     filename: function (req, file, cb) {
//     //   const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
//     //   cb(null, file.fieldname + '-' + uniqueSuffix)
//     cb(null, file.originalname)
//     }
//   })
  
//   const upload = multer({ storage: storage })

//   module.exports = {
//     upload: upload
// };