var express = require("express");
var router = express.Router();

var controler = require("./controler");

router.get("/", controler.test);

module.exports = router;