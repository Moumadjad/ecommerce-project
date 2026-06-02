import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Auth/Login";
import AdminDashboard from "./pages/admin/AdminDashboard";
import StockManagement from "./pages/admin/Stock";
import OrderTracking from "./pages/admin/orders/OrderTracking";
        
        
   function App() {
  return (
    <BrowserRouter>
      <Routes>     
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<AdminDashboard />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/products" element={<StockManagement />} />
        <Route path="/admin/orders" element={<OrderTracking />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;