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

/*
References:

Meta Platforms Inc. (2024) *React Documentation: Components and JSX.* Available at: https://react.dev/

React Router (2024) *React Router Documentation.* Available at: https://reactrouter.com/en/main

Mozilla Developer Network (2024) *JavaScript Modules Documentation.* Available at: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules
*/
