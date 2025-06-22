const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  // This Verified field is used to check if the user has verified their email or not
  verified: {
    type: Boolean,
    default: false,
  },
  verificationToken: String,
  addresses: [
    {
      name: String, 
      houseNo: String,
      street: String,
      landmark: String,
      postalCode: String,
      mobileNo:String,
      
     
    },
  ],
  orders: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model("User", userSchema);
module.exports = User;