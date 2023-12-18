// Import necessary modules
import mongoose from "mongoose";

// Define the item schema
const itemSchema = new mongoose.Schema({
  itemName: {
    type: String,
    required: true,
  },
  itemType: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  mrp: {
    type: Number,
    required: true,
  },
});

// Create and export the item model
export default mongoose.model("Item", itemSchema);
