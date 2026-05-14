import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Dashboard from "./pages/Dashboard";

import Employees from "./pages/Employees";

import Automation from "./pages/Automation";

import Anomalies from "./pages/Anomalies";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<Dashboard />}
        />

        <Route
          path="/employees"
          element={<Employees />}
        />

        <Route
          path="/automation"
          element={<Automation />}
        />

        <Route
          path="/anomalies"
          element={<Anomalies />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;