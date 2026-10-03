const Room = require("../model/room.model")

const addRoom = async(body)=>{
    try {
       const room=  await Room.create(body)
        return room
    } catch (error) {
        return error
    }
}


const roomNumberExist = async (roomNumber)=>{
    try {
        if(roomNumber){
            const roomNumberExist  = await Room.findOne({roomNumber:roomNumber})            
            return roomNumberExist
        }
    } catch (error) {
        return error
    }
}

const roomDetail = async (roomDetail)=>{
    try{
        const room = await Room.findOne(roomDetail)
        return room
    } catch (error) {
        return error
    }
}





module.exports ={
    addRoom,
    roomNumberExist,
    roomDetail
}