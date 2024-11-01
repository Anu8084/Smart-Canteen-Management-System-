
const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://anuragbabaojha:Anurag%409262@cluster0.61tqh.mongodb.net/Adminpage")

const userSchema = mongoose.Schema
({
    name : String,
    email : String,
    password : String,
    
})

const user =mongoose.model('user' ,userSchema)

module.exports={
    userdata : user
}