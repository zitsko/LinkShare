const db = require('./connection.js');
const mongoose = require('mongoose');

const User = mongoose.model("User", {
    email: String,
    password: String,
  });
  
  // const User = mongoose.model("User", {
    //   email: {
      //       type: String,
      //       required: true,
      //       unique: true,
      //   },
      //   password: String,
      // });
      
      
      module.exports = User;