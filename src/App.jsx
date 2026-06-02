import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Auth/Login";
import AdminDashboard from "./pages/admin/AdminDashboard";
import StockManagement from "./pages/admin/Stock";
        
        
   function App() {
  return (
    <BrowserRouter>
      <Routes>     
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<AdminDashboard />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/products" element={<StockManagement />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;