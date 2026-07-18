const express = require("express");
const demoController = require("../controllers/demoController");

const router = express.Router();

router
  .route("/demo")
  .get(demoController.getDemo)
  .post(demoController.createDemo);

module.exports = router;
