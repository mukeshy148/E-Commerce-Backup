const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const crypto = require("crypto");
const nodeMailer = require("nodemailer");

const app = express();
const port = 8000;
const cors = require("cors");

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const jwt = require("jsonwebtoken");

mongoose
  .connect(
    "mongodb+srv://Mukesh148y:Mukesh2005@cluster0.cjasoiz.mongodb.net/",
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
    text: `Please verify your email by clicking on the following link: http://localhost:8000/verify/${verificationToken}`,
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
    const user = await User.findOne({ email });  //{email:"mukesh148y@gmail.com"}
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
