const joi =require("joi")


const bookingValidationSchema = joi.object({
    roomNumber : joi.number().required().min(0),
    customerName: joi.string().required().trim(),
    customerEmail: joi.string().required().email(),
    checkIn: joi.date().required(),
    checkout :joi.date().required(),
    numberOfGuests: joi.number().integer().required().min(0),
})

const getBookingById = joi.object({
    id: joi.string()
      .trim()
      .pattern(/^[0-9a-fA-F]{24}$/)
      .required()
      .messages({
        "string.empty": "Booking ID is required",
        "string.pattern.base": "Booking ID must be a valid MongoDB ObjectId",
        "any.required": "Booking ID is required",
      }),
  });


const getBooking = joi.object({
    email:  joi.string().email(),
    name: joi.string().trim(),
    bookingNumber: joi.number().min(0),
    limit: joi.number(),
    page: joi.number(),

})

const canelBookingSchema = joi.object({
    reason: joi.string().required().trim(),
})



module.exports ={
    bookingValidationSchema,
    getBookingById,
    getBooking,
    canelBookingSchema

}

