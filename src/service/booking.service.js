const Booking = require("../model/booking.model")

const addBooking = async (bookingDetail)=>{
    try{
        console.log(bookingDetail);
        
       const booking= await Booking.create(bookingDetail)

        return booking
    }catch(error){
        console.log(error);
        
        return error.message
    }
}


const bookingDetail  = async(bookingId)=>{
    try {
        const booking = await Booking.findById(bookingId).populate("roomId" ,"roomNumber roomType pricePerNight")
        return booking

    } catch (error) {
        console.log(error)
    }
}

const findBooking = async (data,limit=10,page=1)=>{
    try {
       console.log(data);
       let pageSize =limit
       const skip = (page -1)*pageSize
        const booking = await Booking.find(data).limit(limit).skip(skip)
        console.log(booking);
        
        return booking

    } catch (error) {
        return error.messaage
    }
}

const updateBooking = async (id, reason) => {
    try {
        const bookingResult = await Booking.findByIdAndUpdate(
            id,
            {
                $set: {
                    status: "cancel",
                    cancelledAt: new Date(),
                    cancelReason: reason || 'No reason provided'
                }
            },
            { runValidators: true }
        );            
        return bookingResult;
    } catch (error) {
        // Throw the error so the controller knows the DB update failed
        throw error; 
    }
};



module.exports ={
    addBooking,
    bookingDetail,
    findBooking,
    updateBooking
}