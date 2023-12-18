import React from "react";
import Auth from "./Components/Auth";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import VendorHome from "./Components/Vendor/VendorHome";
import AddItem from "./Components/Vendor/AddItem";
import Item from "./Components/Vendor/Item";
import AdminHome from "./Components/Admin/AdminHome";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Auth />} />
        </Routes>
        <Routes>
          <Route path="/vendor" element={<VendorHome />} />
        </Routes>
        <Routes>
          <Route path="/add_item" element={<AddItem />} />
        </Routes>
        <Routes>
          <Route path="/items" element={<Item/>} />
        </Routes>
        <Routes>
          <Route path="/admin" element={<AdminHome/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
