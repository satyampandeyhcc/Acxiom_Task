import React, { useState } from "react";
import axios from "axios";
import "./AdminHome.css"; 
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const API_BASE = "http://localhost:5000";

const AdminHome = () => {
  const [vendorName, setVendorName] = useState("");
  const [vendorEmail, setVendorEmail] = useState("");
  const [vendorPassword, setVendorPassword] = useState("");

  const handleVendorSignup = async () => {
    try {
      const newVendor = {
        name: vendorName,
        email: vendorEmail,
        password: vendorPassword,
      };

      const response = await axios.post(
        API_BASE+"/vendorsignup",
        newVendor
      );

      // Check if the vendor was added successfully
      if (response.status === 200) {
        console.log("Vendor added successfully:", response.data);
        // Reset the form fields after adding the vendor
        toast.success("Vendor Registration Successfull")
        setVendorName("");
        setVendorEmail("");
        setVendorPassword("");
      } else {
        toast.error("Vendor Registration Failed")
        console.error("Vendor signup failed");
      }
    } catch (error) {
        toast.error(error.response.data);

      console.error("Error adding vendor:", error);
    }
  };

  return (
    <div className="admin-main">
      <div className="admin-home-container">
        <h2>Add Vendor</h2>
        <form className="admin-home-form">
          <div>
            <label>Vendor Name:</label>
            <input
              type="text"
              value={vendorName}
              onChange={(e) => setVendorName(e.target.value)}
            />
          </div>
          <div>
            <label>Vendor Email:</label>
            <input
              type="email"
              value={vendorEmail}
              onChange={(e) => setVendorEmail(e.target.value)}
            />
          </div>
          <div>
            <label>Password:</label>
            <input
              type="password"
              value={vendorPassword}
              onChange={(e) => setVendorPassword(e.target.value)}
            />
          </div>
          <button type="button" onClick={handleVendorSignup}>
            Add Vendor
          </button>
        </form>
      </div>
      <ToastContainer position="top-center" autoClose={3000} theme="colored" />
    </div>
  );
};

export default AdminHome;
