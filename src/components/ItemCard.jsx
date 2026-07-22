// src/components/ItemCard.jsx
import { Link } from "react-router-dom";

export default function ItemCard({ item, favorites, cart, featured = false }) {
  const isFav = favorites.has(item.id);
  const isSoldOut = item.status === "soldout";

  const handleFavorite = (e) => {
    e.preventDefault(); // 親の<Link>による画面遷移を止める
    if (isFav) {
      favorites.remove(item.id);
    } else {
      favorites.add(item.id);
    }
  };

  const handleAddToCart = (e) => {
    e.preventDefault();
    cart.add(item.id);
  };

  return (
    <Link
      to={`/items/${item.id}`}
      className={featured ? "item-card item-card--featured" : "item-card"}
    >
      <div className="item-card__image">
        <img src={item.image} alt={item.name} />
        {featured && <span className="item-card__pick">PICK UP</span>}
        {isSoldOut && <span className="item-card__badge">soldout</span>}

        <button
          type="button"
          className={isFav ? "item-card__fav is-active" : "item-card__fav"}
          onClick={handleFavorite}
          aria-label="お気に入りに追加"
        >
          {isFav ? "♥" : "♡"}
        </button>

        <div className="item-card__overlay">
          <button
            type="button"
            className="item-card__cart"
            onClick={handleAddToCart}
            disabled={isSoldOut}
          >
            {isSoldOut ? "sold out" : "＋ カートに入れる"}
          </button>
        </div>
      </div>

      <div className="item-card__meta">
        <h3 className="item-card__name">{item.name}</h3>
        <p className="item-card__price">¥{item.price.toLocaleString()}</p>
      </div>
    </Link>
  );
}
