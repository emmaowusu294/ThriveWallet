import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Import Pages
import LandingPage from "./pages/LandingPage";
import DashboardOverview from "./pages/DashboardOverview";
import Transactions from "./pages/Transactions";

// Import Layouts
import DashboardLayout from "./components/layout/DashboardLayout";

function App() {
  return (
    <Router>
      <Routes>
        {/* PUBLIC ROUTE: The Landing Page */}
        <Route path="/" element={<LandingPage />} />

        {/* PRIVATE ROUTES: The Dashboard */}
        {/* Notice how the layout wraps the pages! */}
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<DashboardOverview />} />
          <Route path="transactions" element={<Transactions />} />
          {/* We can easily add more pages later like this: */}
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
