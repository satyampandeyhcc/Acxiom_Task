import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import './Auth.css'
const API_BASE = "http://localhost:5000";

const Auth = () => {
  const [selectedRole, setSelectedRole] = useState("user");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [signupName, setSignupName] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [adminCategory, setAdminCategory] = useState("catering"); // Default category
  const [showLogin, setShowLogin] = useState(true);  
 const handleRoleSelection = (role) => {
   setSelectedRole(role);
   setShowLogin(true);
 };
  const navigate = useNavigate();

 const toggleForm = () => {
   setShowLogin(!showLogin);
 };
//user login
  const handleUserLogin = async () => {
    if (loginEmail === "" || loginPassword === "") {
      toast.error("Fill all details");
      return;
    }
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const { data } = await axios.post(
        API_BASE + `/userlogin`,
        { email: loginEmail, password: loginPassword },
        config
      );
      console.log(data);
   
      toast.success("User logged in successfully");
    } catch (error) {
      console.log(error);
      toast.error(error.response.data);
    }
  };
//admin login
  const handleAdminLogin = async () => {
    if (loginEmail === "" || loginPassword === "") {
      toast.error("Fill all details");
      return;
    }
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const { data } = await axios.post(
        API_BASE + `/adminlogin`,
        { email: loginEmail, password: loginPassword },
        config
      );
      console.log(data);
      setTimeout(() => {
        navigate("/admin");
      }, 2500);
      toast.success("Admin logged in successfully");
    } catch (error) {
      console.log(error);
      toast.error(error.response.data);
    }
  };

  //admin signup
const handleAdminSignup = async () => {
  if (signupName === "" || signupEmail === "" || signupPassword === "") {
    toast.error("Fill all details");
    return;
  }
  try {
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };
    const { data } = await axios.post(
      API_BASE + "/adminSignup",
      {
        name: signupName,
        email: signupEmail,
        password: signupPassword,
        category: adminCategory, // Include category in the request for admin signup
      },
      config
    );
    console.log(data);
    toast.success("Admin registered successfully");
    setTimeout(() => {
      navigate("/admin");
    }, 2500);
  } catch (error) {
    console.log(error);
    toast.error(error.response.data);
  }
};
//vendor login
  const handleVendorLogin = async () => {
    if (loginEmail === "" || loginPassword === "") {
      toast.error("Fill all details");
      return;
    }
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const { data } = await axios.post(
        API_BASE + `/vendorlogin`,
        { email: loginEmail, password: loginPassword },
        config
      );
      console.log(data);

      toast.success("Vendor logged in successfully");
         setTimeout(() => {
           navigate("/vendor");
         }, 2500);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data);
    }
  };
//user signup
  const handleUserSignup = async () => {
    if (signupName === "" || signupEmail === "" || signupPassword === "") {
      toast.error("Fill all details");
      return;
    }
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const { data } = await axios.post(
        API_BASE + "/userSignup",
        { name: signupName, email: signupEmail, password: signupPassword },
        config
      );
      console.log(data);
      toast.success("User registered successfully");
    } catch (error) {
      console.log(error);
      toast.error(error.response.data);
    }
  };

return (
  <div className="container">
    <h2 className="blue-text">Select Your Role</h2>
    <div>
      <button onClick={() => handleRoleSelection("user")}>User </button>
      <button onClick={() => handleRoleSelection("admin")}>Admin </button>
      <button onClick={() => handleRoleSelection("vendor")}>Vendor </button>
    </div>

    {selectedRole && showLogin && (
      <div>
        <h2>
          {selectedRole === "user"
            ? "User"
            : selectedRole === "admin"
            ? "Admin"
            : "Vendor"}
           Login
        </h2>
        <label>
          Email:
          <input
            type="email"
            value={loginEmail}
            onChange={(e) => setLoginEmail(e.target.value)}
          />
        </label>
        <br />
        <label>
          Password:
          <input
            type="password"
            value={loginPassword}
            onChange={(e) => setLoginPassword(e.target.value)}
          />
        </label>
        <br />
        <button
          onClick={
            selectedRole === "user"
              ? handleUserLogin
              : selectedRole === "admin"
              ? handleAdminLogin
              : handleVendorLogin
          }
        >
          Login
        </button>
        {selectedRole !== "vendor" && (
          <button onClick={toggleForm}>Register</button>
        )}
      </div>
    )}

    {selectedRole && !showLogin && (
      <div>
        <h2>
          {selectedRole === "user" ? "User" : "Admin"}  Signup
        </h2>
        {/* Registration Form */}
        <label>
          Name:
          <input
            type="text"
            value={signupName}
            onChange={(e) => setSignupName(e.target.value)}
          />
        </label>
        <br />
        <label>
          Email:
          <input
            type="email"
            value={signupEmail}
            onChange={(e) => setSignupEmail(e.target.value)}
          />
        </label>
        <br />
        <label>
          Password:
          <input
            type="password"
            value={signupPassword}
            onChange={(e) => setSignupPassword(e.target.value)}
          />
        </label>
        <br />
        {selectedRole === "admin" && (
          <label>
            Category:
            <select
              value={adminCategory}
              onChange={(e) => setAdminCategory(e.target.value)}
            >
              <option value="catering">Catering</option>
              <option value="florist">Florist</option>
              <option value="decoration">Decoration</option>
              <option value="lighting">Lighting</option>
            </select>
          </label>
        )}
        <br />
        {selectedRole !== "vendor" && (
          <button
            onClick={
              selectedRole === "user"
                ? handleUserSignup
                : selectedRole === "admin"
                ? handleAdminSignup
                : null // No signup for vendor
            }
          >
            Signup
          </button>
        )}
        <button onClick={toggleForm}>Back to Login</button>
      </div>
    )}

    <ToastContainer position="top-center" autoClose={3000} theme="colored" />
  </div>
);


};

export default Auth;
