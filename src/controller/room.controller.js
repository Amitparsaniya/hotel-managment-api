const { addRoom, roomNumberExist } = require("../service/room.service")

exports.createRoom = async(req,res)=>{
    const {roomNumber,roomType,pricePerNight,capacity} = req.body

    
    if(!["standard","deluxe","suite"].includes(roomType)){
        return res.json({message:"Invalid room type"})
    }

    const checkRoomNumber = await roomNumberExist(roomNumber)

    

    if(checkRoomNumber){
        return res.json({messsage:"Room number allredy exist"})
    }

    await addRoom(req.body)


    return res.status(201).json({message:"romm created successfully"})
}