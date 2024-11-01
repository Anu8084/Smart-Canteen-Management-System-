const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://anuragbabaojha:Anurag%409262@cluster0.61tqh.mongodb.net/anurag", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// User schem
const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    id: String
});

const User = mongoose.model('User', userSchema);

// Order schema
const orderSchema = new mongoose.Schema({
    userId: String,               // ID of the user placing the order
    items: [                      // Array of items in the order
        {
            name: String,
            quantity: Number,
            price: Number
        }
    ],
    totalAmount: Number,          // Total amount for the order
    orderDate: {                  // Date of the order
        type: Date,
        default: Date.now
    }
});

const Order = mongoose.model('Order', orderSchema);

module.exports = {
    userdata: User,
    Order: Order                  // Export the Order model for storing orders
};
