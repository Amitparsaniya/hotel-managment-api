const joi =require("joi")


const createRoomValidationSchema = joi.object({
    roomNumber : joi.number().integer().required().min(0),
    roomType: joi.string(),
    pricePerNight: joi.number().required().min(0),
    capacity: joi.number().integer().required().min(0),
})


module.exports ={
    createRoomValidationSchema
}

