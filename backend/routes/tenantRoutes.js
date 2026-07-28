const express = require("express");

const tenantController = require("../controllers/tenantController");
const uploadImage = require("../middlewares/imageUpload");
const imageProcessor = require("../middlewares/imageProcessor");

const router = express.Router();

router.route("/tenants").post(
  uploadImage.uploadFields([
    { name: "tenantImage", maxCount: 1 },
    { name: "addressProofImage", maxCount: 1 },
  ]),
  imageProcessor.resizeImage("tenantImage", "tenants", "tenant"),
  imageProcessor.resizeImage(
    "addressProofImage",
    "addressProofs",
    "address-proof",
  ),
  tenantController.createTenant,
);

module.exports = router;
