const express = require("express");

const roomController = require("../controllers/roomController");

const router = express.Router();

router.route("/rooms").post(roomController.createRoom).get(roomController.getAllRooms);
router
  .route("/room/:id")
  .get(roomController.getRoom)
  .patch(roomController.patchRoom)
  .put(roomController.updateRoom)
  .delete(roomController.deleteRoom);

module.exports = router;
