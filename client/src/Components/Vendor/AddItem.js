import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./AddItem.css";
const API_BASE = "http://localhost:5000";

const AddItem = () => {
  const [itemName, setItemName] = useState("");
  const [itemType, setItemType] = useState("");
  const [price, setPrice] = useState("");
  const [mrp, setMrp] = useState("");

  const handleAddItem = async () => {
    if (!itemName || !itemType || !price || !mrp) {
      toast.error("Please fill all details");
      return;
    }

    if (parseFloat(mrp) < parseFloat(price)) {
      toast.error("MRP must be greater than or equal to price");
      return;
    }

    const newItem = {
      itemName,
      itemType,
      price,
      mrp,
    };

    try {
      const response = await axios.post(
        API_BASE+"/additem",
        newItem
      );

      if (response.status === 201) {
        console.log("Item added successfully:", response.data.item);
        toast.success("Item added successfully!!");
        setItemName("");
        setItemType("");
        setPrice("");
        setMrp("");
      } else {
        console.error("Item adding failed");
      }
    } catch (error) {
      console.error("Error adding item:", error);
      toast.error(error.response.data)
    }
  };

  return (
    <div className="ItemOuter">
      <div className="ItemMain">
        <h2>Add New Item</h2>
        <form className="ItemForm">
          <div>
            <label>Item Name:</label>
            <input
              type="text"
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
            />
          </div>
          <div>
            <label>Item Type:</label>
            <input
              type="text"
              value={itemType}
              onChange={(e) => setItemType(e.target.value)}
            />
          </div>
          <div>
            <label>Price:</label>
            <input
              type="text"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
          <div>
            <label>MRP:</label>
            <input
              type="text"
              value={mrp}
              onChange={(e) => setMrp(e.target.value)}
            />
          </div>
          <button type="button" onClick={handleAddItem}>
            Add Item
          </button>
        </form>
        <ToastContainer
          position="top-center"
          autoClose={3000}
          theme="colored"
        />
      </div>
    </div>
  );
};

export default AddItem;
