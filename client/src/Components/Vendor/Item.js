import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Item.css"; // Add CSS styles here

const Item = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    // Fetch items from the backend when the component mounts
    const fetchItems = async () => {
      try {
        const response = await axios.get("http://localhost:5000/getitems"); // Update with your backend URL
        setItems(response.data);
      } catch (error) {
        console.error("Error fetching items:", error);
      }
    };

    fetchItems();
  }, []);

  return (
    <div className="item-container">
      <h2>All Items</h2>
      <div className="item-list">
        {items.map((item) => (
          <div key={item._id} className="item">
            <h3>{item.itemName}</h3>
            <p>Type: {item.itemType}</p>
            <p>Price: ${item.price}</p>
            <p>MRP: ${item.mrp}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Item;
