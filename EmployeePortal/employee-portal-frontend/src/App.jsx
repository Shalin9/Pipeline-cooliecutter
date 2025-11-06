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
