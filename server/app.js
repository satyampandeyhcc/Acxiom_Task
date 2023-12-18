import express from "express";
const app = express();
import cors from "cors";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import User from "./models/userSchema.js";
import Admin from "./models/adminSchema.js";
import Vendor from "./models/vendorSchema.js";
import { connect } from "mongoose";
import { config } from "dotenv";
import Item from "./models/itemSchema.js";
const port = 5000;
app.use(express.json());
app.use(cors());
app.get("/", (req, res) => {
  res.send("Hello World!");
});

const JWT_Secret = process.env.JWT_Secret;
//user signup
app.post("/usersignup", async (req, res) => {
  console.log(req.body);
  const { name, email,password } = req.body;
  if (!name || !email  || !password) {
    return res.status(422).json({ error: "Pls fill all the fields" });
  }
  console.log(req.body);
  try {
    const UserExists = await User.findOne({ email: email });

    if (UserExists) {
      return res.status(422).json("User already Exists");
    } else {
      const user = await User.create({
        name,
        email,
        password,
      });

      if (user) {
        res.status(200).json({
          _id: user._id,
          name: user.name,
          email: user.email,
          mobile: user.mobile,
          message: "User registered successfully",
        });
      } else res.status(400).json("Signup failed");
    }
  } catch (error) {
    res.status(422).json(`${error}`);
  }
});
// User Login
app.post("/userlogin", async (req, res) => {
  const { email, password } = req.body;
  console.log(req.body);
  if (!email || !password) {
    return res.status(422).json({ error: "Please provide both email and password" });
  }

  try {
    const user = await User.findOne({ email: email });

   

    if (user) {
      const isMatch = await bcrypt.compare(password, user.password);
      console.log(isMatch);
      if (!isMatch) {
        res.json({ message: "Invalid Credential" });
      } else {        
        res.status(200).json({message:"Login Success"})
      }
    } else {
      res.status(401).json({ error: "Invalid email or password" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Admin Login
app.post("/adminlogin", async (req, res) => {
  const { email, password } = req.body;
  console.log(req.body);
  if (!email || !password) {
    return res.status(422).json({ error: "Please provide both email and password" });
  }
  try {
    const admin = await Admin.findOne({ email: email });
  console.log(admin);

    if (!admin) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

   
    if (admin) {
      const isMatch = await bcrypt.compare(password, admin.password);
      console.log(isMatch);
      if (!isMatch) {
        res.json({ message: "Invalid Credential" });
      } else {
        res.status(200).json({ message: "Login Success" });
      }
    } else {
      res.status(401).json({ error: "Invalid email or password" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
//admin signup
app.post("/adminsignup", async (req, res) => {
  console.log(req.body);
  const { name, email, password, category } = req.body;
  console.log(req.body);
  if (!name || !email || !password || !category) {
    return res.status(422).json({ error: "Pls fill all the fields" });
  }
  console.log(req.body);
  try {
    const AdminExists = await Admin.findOne({ email: email });

    if (AdminExists) {
      return res.status(422).json("Admin already Exists");
    } else {
      const admin = await Admin.create({
        name,
        email,
        password,
        category
      });

      if (admin) {
        res.status(200).json({
          _id: admin._id,
          name: admin.name,
          email: admin.email,
          message: "User registered successfully",
        });
      } else res.status(400).json("Signup failed");
    }
  } catch (error) {
    res.status(422).json(`${error}`);
  }
});

//vendor login
app.post("/vendorlogin", async (req, res) => {
  const { email, password } = req.body;
  console.log(req.body);
  if (!email || !password) {
    return res
      .status(422)
      .json({ error: "Please provide both email and password" });
  }
  try {
    const vendor = await Vendor.findOne({ email: email });
    console.log(vendor);

    if (!vendor) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    if (vendor) {
      const isMatch = await bcrypt.compare(password, vendor.password);
      console.log(isMatch);
      if (!isMatch) {
        res.json({ message: "Invalid Credential" });
      } else {
        res.status(200).json({ message: "Login Success" });
      }
    } else {
      res.status(401).json({ error: "Invalid email or password" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//vendor signup
app.post("/vendorsignup", async (req, res) => {
  console.log(req.body);
  const { name, email, password } = req.body;
  console.log(req.body);
  if (!name || !email || !password) {
    return res.status(422).json({ error: "Pls fill all the fields" });
  }
  console.log(req.body);
  try {
    const VendorExists = await Vendor.findOne({ email: email });

    if (VendorExists) {
      return res.status(422).json("Vendor already Exists");
    } else {
      const vendor = await Vendor.create({
        name,
        email,
        password,
      });

      if (vendor) {
        res.status(200).json({
          _id: vendor._id,
          name: vendor.name,
          email: vendor.email,
          message: "User registered successfully",
        });
      } else res.status(400).json("Signup failed");
    }
  } catch (error) {
    res.status(422).json(`${error}`);
  }
});


// Add Item Route
app.post("/additem", async (req, res) => {
  const { itemName, itemType, price, mrp } = req.body;

  // Check if all required fields are provided
  if (!itemName || !itemType || !price || !mrp) {
    return res.status(400).json({ error: "Please provide all item details" });
  }

  try {
    // Create a new item document
    const newItem = new Item({
      itemName,
      itemType,
      price,
      mrp,
    });

    // Save the item to the database
    const savedItem = await newItem.save();

    res.status(201).json({
      message: "Item added successfully",
      item: savedItem,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Backend API endpoint to get all items
app.get("/getitems", async (req, res) => {
  try {
    const items = await Item.find(); // Assuming you have a "Item" model
    res.status(200).json(items);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// DB configuration
config();
connect(process.env.DATABASE)
  .then(() => {
    console.log("Connected");
  })
  .catch((error) => {
    console.log("no connection: " + error);
  });
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
