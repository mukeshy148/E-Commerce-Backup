const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const crypto = require("crypto");
const nodeMailer = require("nodemailer");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 8000;

const cors = require("cors");

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const jwt = require("jsonwebtoken");

mongoose
  .connect(process.env.MONGO_URL,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

app.listen(port, () => console.log(`Server running on port ${port}`));

app.get('/', (req, res) => {
  res.send('Server is Live');
});


//Endpoint to Register a app

const User = require("./models/user");
const Order = require("./models/order");



app.post("/register", async (req, res) => {
  console.log("Request body:", req.body);

  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    // Check if user already exists
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Create a new user
    const newUser = new User({ name, email, password });

    //Genearate and store verification token
    newUser.verificationToken = crypto.randomBytes(20).toString("hex");

    // Save the user to the database
    await newUser.save();

    // Send verification email
    sendVerificationEmail(newUser.email, newUser.verificationToken);
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Function to send verification email
const sendVerificationEmail = async (email, verificationToken) => {
  // Create a NodeMailer transporter
  const transporter = nodeMailer.createTransport({
    service: "gmail",
    auth: {
      user: "mukeshcrypto60@gmail.com",
      pass: "plgxvjynpvhralwa",
    },
    tls: {
      rejectUnauthorized: false, // ⚠️ This disables SSL certificate checks
    },
  });

  //Compose the email
  const mailOptions = {
    from: "amazonclone.com",
    to: email,
    subject: "Email Verification",
    text: `Please verify your email by clicking on the following link: https://e-commerce-backup.onrender.com/verify/${verificationToken}`,
  };

  try {
    // Send the email
    await transporter.sendMail(mailOptions);
    console.log("Verification email sent successfully ", info.response);
  } catch (error) {
    console.error("Error sending verification email:", error);
  }
};

// Endpoint to verify email
app.get("/verify/:token", async (req, res) => {
  try {
    // Find the user with the verification token
    const token = req.params.token;

    // Find the user with the verification token
    const user = await User.findOne({ verificationToken: token });
    if (!user) {
      return res.status(400).json({ message: "Invalid or expired token" });
    }

    //Mark the user as verified
    user.verified = true;
    user.verificationToken = undefined; // Clear the verification token
    await user.save();

    // Send a success response
    res.status(200).json({ message: "Email verified successfully" });
  } catch (error) {
    console.error("Error verifying email:", error);
    res.status(500).json({ message: "Email verification Failed" });
  }
});

const generateSecretKey = () => {
  const secret = crypto.randomBytes(32).toString("hex");
  return secret;
};

const secretKey = generateSecretKey();

// Endpoint to login a user
app.post("/login", async (req, res) => {
  try {
    // Find the user by email
    const { email, password } = req.body;
    const user = await User.findOne({ email }); //{email:"mukesh148y@gmail.com"}
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    // Check if the password is correct or not
    if (user.password != password) {
      return res.status(401).json({ message: "Invalid password" });
    }

    //Generate a JWT token // It combines userId & secretKey to genearate a JWT token
    const token = jwt.sign({ userID: user._id }, secretKey); //This user._id is defalut by MongoDB
    console.log("Token generated:", token);

    res.status(200).json({ token });
  } catch (error) {
    console.error("Error logging in user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

//End Point to store new user's address part

app.post("/address", async (req, res) => {
  try {
    const { userId, address } = req.body;

    // Find the user by ID
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Add the new address to the user's addresses array
    user.addresses.push(address);
    // Save the updated user document
    await user.save();
    res.status(200).json({ message: "Address added successfully", user });
  } catch (error) {
    console.error("Error adding address:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Endpoint to get all addresses of a user

app.get("/address/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    console.log("🔍 Received userId123:", userId);

    const user = await User.findById(userId);
    console.log("👤 Found user123:", user);

    if (!user) {
      return res
        .status(404)
        .json({ message: "ERROR!: There is no User to Retrive the Address" });
    }

    const addresses = user.addresses;
    res.json({ addresses: user.addresses || [] });
    console.log("Value getted from index.js api is :  ", addresses);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving the address" });
  }
});

//End-Point to store all the Orders
app.post("/orders", async (req, res) => {

  
  try {
    const { userId, cartItems, totalPrice, shippingAddress, paymentMethod } =
      req.body;

      console.log("✅ Incoming Order Data:", req.body);

    const user = await User.findById(userId);
    if (!user) {
      return res
        .status(500)
        .json({ message: "User not founfd while Placing a Order" });
    }

    // Create a Array of Products obj from Cart Items
    const products = cartItems.map((item) => ({
      name: item?.title,
      quantity: item.quantity,
      price: item.price,
      image: item?.image,
    }));

    // Now Storing to real Order DB
    const order = new Order({
      user: userId,
      cartItems: products,
      totalPrice: totalPrice,
      shippingAddress: {
        name: shippingAddress.name,
        address: `${shippingAddress.street}, ${shippingAddress.houseNo}`,
        houseNo: shippingAddress.houseNo,
        landmark: shippingAddress.landmark,
        postalCode: shippingAddress.postalCode,
      },
      paymentMethod: paymentMethod,
    });

    await order.save();

    res.status(200).json({ message: "Order Placed succeesfully..." });
  } catch (error) {
    res.status(500).json({ message: "Error to Place Orders" });
  }
});

//end-point to get User Profile Details

app.get("/profile/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;

    const user = await User.findById(userId);

    if (!user) {
      return res
        .status(500)
        .json({ message: "User Not found while fetching User Profile" });
    }
    console.log("Profile api screeen :!!!!!!!!2 ", userId); 
    

    return res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ message: "Error occured in Profile Fetch Part" });
  }
});

//end-point to get User Order Details
app.get("/order/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;

    const orders = await Order.find({ user: userId }).populate("user");

    if (!orders || orders.length == 0) {
      return res
        .status(404)
        .json({ message: "No Orders placed for thsi User  " });
    }
    return res.status(200).json({orders});
  } catch (error) {
    res.status(500).json({ message: "Error occured in Order Fetch Part" });
  }
});

// ✅ 404 logging middleware (put this LAST)
app.use((req, res) => {
  console.log("❌ Route not found:", req.method, req.url);
  res.status(404).send("Route not found");
});

app.listen(port, () => console.log(`🚀 Server running on port ${port}`));
