const express = require("express");
const mongoose = require('mongoose');
const app = express();
const port = 3000;
const cors = require('cors');
const { userdata } = require('./db.js');
const { Uname, Uemail, Upassword } = require('./verify.js');

app.use(express.json());
app.use(cors());

// Login Route
app.post('/adminlogin', async (req, res) => {
  const { name, password } = req.body;

  try {
    // Find user by uniqueId and password
    const userFound = await userdata.findOne({ name: name, password: password });
    if (!userFound) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    res.status(200).json({ userFound, message: 'Login successful' });
  } 
  
  catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
  
});


// const user = new userdata({
//   name: 'Anurag',
//   email:'anuragbabaojha@gmail.com',
//   password: 'anu'
// });


// user.save()




// Start server
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
