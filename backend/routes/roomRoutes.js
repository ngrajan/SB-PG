const express = require("express");

const roomController = require("../controllers/roomController");
const uploadMedia = require("../middlewares/imageUpload");
const mediaProcessor = require("../middlewares/mediaProcessor");
const router = express.Router();

router
  .route("/rooms")
  .post(
    uploadMedia.uploadMultiple("roomMedia", 3),
    mediaProcessor.processMedia("roomMedia", "rooms", "room"),
    roomController.createRoom,
  )
  .get(roomController.getAllRooms);
router
  .route("/room/:id")
  .get(roomController.getRoom)
  .patch(roomController.patchRoom)
  .put(roomController.updateRoom)
  .delete(roomController.deleteRoom);

module.exports = router;
