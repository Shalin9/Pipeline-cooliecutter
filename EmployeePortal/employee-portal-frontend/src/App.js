import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import PaymentsPage from "./pages/PaymentsPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/payments" element={<PaymentsPage />} />
      </Routes>
    </Router>
  );
}

export default App;
