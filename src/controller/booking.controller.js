const Booking = require("../model/booking.model");
const { addBooking, bookingDetail, findBooking, updateBooking } = require("../service/booking.service");
const { roomDetail } = require("../service/room.service");
const crypto= require("crypto")
const mongoose = require("mongoose")

exports.createBooking =async (req,res)=>{
    try {        
        const {roomNumber,customerName,customerEmail,checkIn,checkout,numberOfGuests,status} = req.body
        
        const checkInDate = new Date(checkIn)
        const checkOutDate = new Date(checkout)
        if(isNaN(checkInDate.getTime()||isNaN(checkOutDate.getTime()))){
            return res.json({message:"date is not valid"})
        }
        // check- in date logic
        if(new Date(checkInDate)>=new Date(checkOutDate)){
            return res.json({message:"check-in must before checkout"})
        }

        const today = new Date()
        today.setHours(0,0,0,0)
        //check date is not less than today
        if(checkInDate<today){
            return res.json({message:"check-in date can not be in the past"})
        }

        const room = await roomDetail({roomNumber:roomNumber})        

        if(!room){
            return res.json({message:"Room Details not found!"})
        }

        if(room.status==="maintenance"){
            return res.status(400).json({message:"Room under maintenance, please select other room!"})
        }


        const startDate = new Date(checkIn)
        console.log(/startDate/,startDate);
        
        const endDate = new Date(checkout)
        
         // check overLapbooking for booking
        const overLapbooking  = await Booking.findOne({
            roomId:room._id,
            status:"confirmed",
            checkIn:{
                $lt:endDate,
            },
            checkout:{
                $gt:startDate
            }
        })        
        if(overLapbooking){
            return res.status(400).json({message:"in selected date room is already booked , please select other date!"})

        }

        // const diff = endDate.getTime() - startDate.getTime()

        // const num = Math.ceil

        //    genrate booking detials
         const bookingDetail=await addBooking({
            roomId:room._id,
            roomNumber,
            customerName,
            customerEmail,
            checkIn,
            checkout,
            numberOfGuests,
            bookingNumber:crypto.randomUUID()
         })
        return  res.status(201).json({message:"Booking created successfully",bookingNumber:bookingDetail.bookingNumber})

    } catch (error) {
        return res.status(500).json({ 
            message: "Internal server error", 
            error: error.message 
        });
    }
}


exports.bookingDetails  = async (req,res)=>{
    try {
        const   bookingId = req.params.id        

        if (!mongoose.Types.ObjectId.isValid(bookingId)) {
            return res.status(400).json({ message: 'Invalid ID format provided.' });
          }
        const bookingResult = await bookingDetail(bookingId)

        if(!bookingResult){
            return  res.status(404).json({message:"booking not found with this id"})
        }

        return res.status(200).json({message:"booking detail fetch sucessfully",data:bookingResult})

    } catch (error) {
        return res.status(500).json({ 
            message: "Internal server error", 
            error: error.message 
        });
        
    }
}

exports.bookingList = async( req,res)=>{
    try {
        
        const {name,email,bookingNumber,limit,page} =req.query
        let query = {status:"confirmed"}
        if(name){
            query = {customerName:name}
        }
        if(email){
            query = {customerEmail:email}
        }
        if(bookingNumber){
            query= {bookingNumber:bookingNumber}
        }

        const result = await findBooking(query,limit,page)
        if(result){
            return res.status(200).json({messaage:"details fetch sucessfully",data:result})
        }
    } catch (error) {
        return res.status(500).json({ 
            message: "Internal server error", 
            error: error.message 
        });
    }
}


exports.cancelBooking = async( req,res)=>{
    try {
        const bookingId = req.params.id      
        const  {reason} =req.body

        if (!mongoose.Types.ObjectId.isValid(bookingId)) {
            return res.status(400).json({ message: 'Invalid ID format provided.' });
        }

          const bookingResult = await bookingDetail(bookingId)

          if(!bookingResult){
              return  res.status(404).json({message:"booking not found with this id"})
          }

          if(bookingResult.status==='cancel'){
            return  res.status(400).json({message:"booking allready cancelled"})
          }
          const bookingUpdate = await updateBooking(bookingId,reason)


        if(bookingUpdate){
            return  res.status(200).json({message:"Booking update successfully"})
        }
              
    } catch (error) {
        return res.status(500).json({ 
            message: "Internal server error", 
            error: error.message 
        });
        
    }
}