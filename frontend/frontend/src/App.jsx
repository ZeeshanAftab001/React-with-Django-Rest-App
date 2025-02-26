import { Routes, Route } from "react-router-dom";
import ProtectRoute from "./components/ProtectRoute";
import Login from "./components/Login"
import Register from "./components/Register"
import Home from "./Pages/Home.jsx"
import Books from "./Pages/Books.jsx"
import NotFound from "./Pages/NotFound.jsx"

function App() {
  return (
    <Routes>
      {/* Public Route */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Protected Routes */}
      <Route element={<ProtectRoute />}>
        <Route path="/" element={<Home />} />
        <Route path="/books" element={<Books />} />
      </Route>

      {/* Catch-all 404 Route */}
      <Route path="*" element={<NotFound />} />
      
    </Routes>
  );
}

export default App;
