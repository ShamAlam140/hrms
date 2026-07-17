const express = require("express");
const upload = require("../middleware/multerMiddleware");
const router = express.Router();
const  CsvController= require('../Controller/CsvUploadController')

router.post('/upload-stockCsv', upload.single('file'),CsvController.uploadStockCsv )
router.post('/upload-holidayCsv', upload.single('file'),CsvController.uploadHolidayCsv )


module.exports = router;