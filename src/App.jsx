import { Routes, Route } from "react-router-dom";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import Home from "./pages/Home.jsx";
import ItemDetail from "./pages/ItemDetail.jsx";
import About from "./pages/About.jsx";
import Favorites from "./pages/Favorites.jsx";
import Cart from "./pages/Cart.jsx";
// 既存のimportに追加
import { useFavorites } from "./hooks/useFavorites.js";
// src/App.jsx のimportに追加
import { useCart } from "./hooks/useCart.js";

export default function App() {
  const favorites = useFavorites();
  const cart = useCart(); // 追加

  return (
    <div className="app">
      <Header cart={cart} />
      <main className="app__main">
        <Routes>
          <Route path="/" element={<Home favorites={favorites} cart={cart} />} />
          <Route path="/items/:id" element={<ItemDetail favorites={favorites} />} />
          <Route path="/about" element={<About />} />
          <Route path="/favorites" element={<Favorites favorites={favorites} />} />
          <Route path="/cart" element={<Cart cart={cart} />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
