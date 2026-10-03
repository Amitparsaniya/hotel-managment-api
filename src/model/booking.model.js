const mongoose = require("mongoose")

const bookingSchema = new mongoose.Schema({
    roomId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Room",
        required: true
    },
    roomNumber:{
        type:Number,
        required:true,
    },
    customerName:{
        type:String,
        required:true
    },
    customerEmail:{
        type:String,
        required:true
    },
    checkIn:{
        type:Date,
        requied:true
    },
    checkout:{
        type:Date,
        requied:true
    },
    numberOfGuests:{
        type:Number,
        required :true
    },
    status:{
        type:String,
        enum:["confirmed","pending","cancel"],
        default:"confirmed"
    },
    bookingNumber:{
        type:String,
    },
    cancelledAt:{
        type:Date
    },
    cancelReason: {
        type:String
    }
},{
    timestamps:true
})
const Booking = mongoose.model("Booking",bookingSchema)

module.exports = Booking