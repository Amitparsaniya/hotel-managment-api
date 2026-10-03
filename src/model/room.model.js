const mongoose = require("mongoose")

const rooomSchema = new mongoose.Schema({
    roomNumber:{
        type:Number,
        required:true,
        unquie:true
        
    },
    roomType:{
        type:String,
        enum:["standard","deluxe","suite"],
        default:"standard"
    },
    pricePerNight:{
        type:Number,
        required:true
    },
    capacity:{
        type:Number,
        required:true
    },
    status:{
        type:String,
        enum:["available","booked","maintenance"],
        default:"available"
    }
},{
    timestamps:true
})
rooomSchema.index({roomType:1})
const Room = mongoose.model("Room",rooomSchema)

module.exports = Room