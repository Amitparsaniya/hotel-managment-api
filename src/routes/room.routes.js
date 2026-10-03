const { createRoom } = require("../controller/room.controller")
const { createRoomValidationSchema } = require("../validation/room.validation")

const express = require("express")
const { validateRequest } = require("../validation/validation")

const roomRoute = express.Router()

roomRoute.post("/create",validateRequest(createRoomValidationSchema),createRoom)


module.exports= roomRoute