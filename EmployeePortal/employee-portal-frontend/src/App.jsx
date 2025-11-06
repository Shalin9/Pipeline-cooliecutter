import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import PaymentsPage from "./pages/PaymentsPage";

const App = () => {
  const token = localStorage.getItem("token");
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/payments" element={token ? <PaymentsPage /> : <Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};

export default App;


/*
Reference list:

Meta Platforms Inc. (2024) *React Documentation: Components and Hooks.* Available at: https://react.dev/

React Router (2024) *React Router Documentation.* Available at: https://reactrouter.com/en/main

Mozilla Developer Network (2024) *Web Storage API - localStorage and sessionStorage.* Available at: https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API

Mozilla Developer Network (2024) *JavaScript Modules Documentation.* Available at: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules
*/
