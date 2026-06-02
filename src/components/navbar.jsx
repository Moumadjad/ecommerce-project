import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-black text-white px-6 py-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">
        E-Commerce
      </h1>

      <div className="flex gap-6">
        <Link to="/">Accueil</Link>
        <Link to="/products">Produits</Link>
        <Link to="/cart">Panier</Link>
        <Link to="/admin">Admin</Link>
      </div>
    </nav>
  );
}