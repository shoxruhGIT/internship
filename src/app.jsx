import React from "react";
import { Route, Routes } from "react-router-dom";
import { Login, Main, Register } from "./components";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
};

export default App;
