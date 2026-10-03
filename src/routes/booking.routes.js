const { createRoom } = require("../controller/room.controller")
const { createRoomValidationSchema } = require("../validation/room.validation")

const express = require("express")
const { validateRequest, validateRequestForParam, validateParams } = require("../validation/validation")
const { createBooking, bookingDetails, bookingList, cancelBooking } = require("../controller/booking.controller")
const { bookingValidationSchema, getBookingById, getBooking, canelBookingSchema } = require("../validation/booking.validation")

const bookingRoute = express.Router()

bookingRoute.post("/create",validateRequest(bookingValidationSchema),createBooking)
bookingRoute.get("/list",validateRequest(getBooking,'query'),bookingList)
bookingRoute.get("/:id",validateRequest(getBookingById,'params'),bookingDetails)
bookingRoute.patch("/:id/cancel",validateRequest(canelBookingSchema),cancelBooking)







module.exports= bookingRoute