const express = require("express");
const mongoose = require('mongoose');
const app = express();
const port = 5000;
const cors = require('cors');
const { userdata } = require('./db.js');
const { Uname, Uemail, Upassword } = require('./verify.js');

app.use(express.json());
app.use(cors());

// Login Route
app.post('/login', async (req, res) => {
  const { rfid, password } = req.body;

  try {
    // Find user by uniqueId and password
    const userFound = await userdata.findOne({ id: rfid, password: password });
    if (!userFound) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    res.status(200).json({ userFound, message: 'Login successful' });
  } 
  catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Registration Route
app.post('/register', async (req, res) => {
  const { name, email, password } = req.body;

  // Validate name
  const verifyUsername = Uname.safeParse(name);
  if (!verifyUsername.success) {
    return res.status(400).json({ message: 'Invalid username' });
  }

  // Validate email
  const verifyEmail = Uemail.safeParse(email);
  if (!verifyEmail.success) {
    return res.status(400).json({ message: 'Invalid email' });
  }

  // Validate password format
  const verifyPassword = Upassword.safeParse(password);
  if (!verifyPassword.success) {
    return res.status(400).json({ message: 'Invalid password' });
  }

  try {
    const emailFound = await userdata.findOne({ email: email });
    if (emailFound) {
      return res.status(409).json({ message: 'Email already exists' });
    }

    let id = String.fromCharCode(name.charCodeAt(0) + 2) +  name[2] + String.fromCharCode(password.charCodeAt(2) + 1) + name[1] + String.fromCharCode(password.charCodeAt(1) + 11) + password[0];  
    await userdata.create({
      name: name,
      email: email,
      password: password,
      id : id
    });

    res.status(201).json({ message: 'Signup successful', id: id });
  } 
  catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Checkout Route
app.post('/checkout', async (req, res) => {
  const { userId, items, totalAmount } = req.body;

  try {
    // Here you can handle the order logic (e.g., save the order to the database)
    // For example, you might have an `orders` collection where you can save the order details

    // Example order structure
    const order = {
      userId: userId,
      items: items,
      totalAmount: totalAmount,
      createdAt: new Date()
    };

    // Save order to the database (you'll need to create an `orders` model/schema)
    // await OrderModel.create(order); // Uncomment and implement OrderModel based on your schema

    res.status(200).json({ message: 'Order placed successfully' });
  } 
  catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Start server
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
