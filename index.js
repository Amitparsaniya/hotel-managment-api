const express = require("express")
const roomRoute = require("./src/routes/room.routes")
const bookingRoute = require("./src/routes/booking.routes")
require("dotenv").config(); 

require("./src/db")


const app = express()


app.use(express.json())

app.use("/api/room",roomRoute)
app.use("/api/booking",bookingRoute)


app.listen(process.env.PORT,()=>{
    console.log('server is up on the port 3000');
    
})