const Room = require("../models/roomModel");
const handlerFunctions = require("../utils/handlerFunctions");

exports.getAllRooms = handlerFunctions.getAll(Room);
exports.getRoom = handlerFunctions.getOne(Room);
exports.createRoom = handlerFunctions.createOne(Room);
exports.patchRoom = handlerFunctions.patchOne(Room);
exports.updateRoom = handlerFunctions.updateOne(Room);
exports.deleteRoom = handlerFunctions.deleteOne(Room);
