import React from "react";
import "./VendorHome.css"
import {  useNavigate} from "react-router-dom";

const UserHome = () => {
  const navigate = useNavigate();
  const handleAddNewItem = () => {
    navigate("/add_item");
  };
  const handleItems = () => {
    navigate("/items");
  };
  return (
    <div className="UserHome">
      <div>
        <button onClick={handleItems}>Your Items</button>
      </div>
      <div>
        <button onClick={handleAddNewItem}>Add New Item</button>
      </div>
      <div>
        <button>Transaction</button>
      </div>
    </div>
  );
};

export default UserHome;
