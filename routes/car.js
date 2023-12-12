var express = require("express");
var router = express.Router();

const carController = require("../Controller/carController");
router.get("/car", carController.carlist);
router.post("/car", carController.caradd);
router.put("/car/:idcard", carController.caredit);
module.exports = router;
