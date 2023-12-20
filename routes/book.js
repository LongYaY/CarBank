var express = require("express");
var router = express.Router();

const carController = require("../Controller/bookController");
router.get("/", carController.bookList);
module.exports = router;
