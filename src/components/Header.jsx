import { Link, NavLink } from "react-router-dom";

// src/components/Header.jsx
export default function Header({ cart }) {
  const cartCount = cart.total;

  return (
    <header className="site-header">
      <div className="site-header__inner">
        <Link to="/" className="site-header__logo">
          <span className="site-header__logo-mark" aria-hidden="true">✦</span>
          Myshop
        </Link>

        <nav className="site-header__nav">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              isActive ? "site-header__link is-active" : "site-header__link"
            }
          >
            home
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              isActive ? "site-header__link is-active" : "site-header__link"
            }
          >
            about
          </NavLink>
          <NavLink
            to="/favorites"
            className={({ isActive }) =>
              isActive ? "site-header__link is-active" : "site-header__link"
            }
          >
            favorites
          </NavLink>
        </nav>

        <Link to="/cart" className="site-header__cart" aria-label="カート">
          <span className="site-header__cart-icon" aria-hidden="true">🛒</span>
          {cartCount > 0 && (
            <span className="site-header__cart-badge">{cartCount}</span>
          )}
        </Link>
      </div>
    </header>
  );
}
