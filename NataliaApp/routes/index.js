var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Gaelic Athletic Association" });
});

router.get("/connectwallet", function (req, res, next) {
  res.render("connectwallet", {
    title: "Connect Wallet -Gaelic Athletic Association",
  });
});

router.get("/contactus", function (req, res, next) {
  res.render("contactus", { title: "Contact Us -Gaelic Athletic Association" });
});

router.get("/findus", function (req, res, next) {
  res.render("findus", { title: "Find Us -Gaelic Athletic Association" });
});

router.get("/aboutus", function (req, res, next) {
  res.render("aboutus", { title: "About Us -Gaelic Athletic Association" });
});

module.exports = router;
