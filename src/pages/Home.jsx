import { useEffect, useState } from "react";
import ItemCard from "../components/ItemCard.jsx";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase.js";

const INITIAL_COUNT = 9;
const STEP = 9;

export default function Home({ favorites, cart }) {
  const [items, setItems] = useState([]);
  const [visibleCount, setVisibleCount] = useState(INITIAL_COUNT);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getDocs(collection(db, "items")).then((snapshot) => {
      setItems(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
      setLoading(false);
    });
  }, []);

  const visibleItems = items.slice(0, visibleCount);
  const hasMore = visibleCount < items.length;

  return (
    <div className="home">
      <section className="hero">
        <span className="hero__blob hero__blob--a" aria-hidden="true" />
        <span className="hero__blob hero__blob--b" aria-hidden="true" />
        <p className="hero__eyebrow">CURATED COLLECTION</p>
        <h1 className="hero__title">
          アイテムを、
          <br className="hero__break" />
          もっと楽しく。
        </h1>
        <p className="hero__subtitle">
          見て、触れて、心が動くものだけを集めました。
          <br className="hero__break" />
          お気に入りを見つけにいこう。
        </p>
      </section>

      <div className="home__head">
        <h2 className="home__heading">Items</h2>
        {!loading && <span className="home__count">{items.length} items</span>}
      </div>

      {loading ? (
        <ul className="home__list">
          {Array.from({ length: 6 }).map((_, i) => (
            <li key={i} className="home__list-item">
              <div className="item-card-skeleton" />
            </li>
          ))}
        </ul>
      ) : (
        <>
          <ul className="home__list">
            {visibleItems.map((item, index) => (
              <li
                key={item.id}
                className="home__list-item"
                style={{ "--delay": `${index * 0.06}s` }}
              >
                <ItemCard
                  item={item}
                  favorites={favorites}
                  cart={cart}
                  featured={index === 0}
                />
              </li>
            ))}
          </ul>
          {hasMore && (
            <button
              type="button"
              className="home__more"
              onClick={() => setVisibleCount((c) => c + STEP)}
            >
              <span>もっと見る</span>
              <span className="home__more-icon" aria-hidden="true">→</span>
            </button>
          )}
        </>
      )}
    </div>
  );
}
