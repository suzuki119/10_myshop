import { Link } from "react-router-dom";

export default function About() {
  return (
    <div className="about">
      <section className="about__hero">
        <p className="about__eyebrow">ABOUT MYSHOP</p>
        <h1 className="about__title">
          「これ、好きかも」を
          <br className="about__break" />
          見つける場所。
        </h1>
        <p className="about__lead">
          Myshopは、ただ物を売るだけのお店ではありません。
          長く使いたくなる道具、部屋に置くだけで気分が上がるもの——
          そんな「心が動くアイテム」だけを集めて紹介する、セレクトサイトです。
        </p>
      </section>

      <ul className="about__features">
        <li className="about__feature">
          <span className="about__feature-icon" aria-hidden="true">
            🔎
          </span>
          <h3 className="about__feature-title">厳選という編集</h3>
          <p className="about__feature-text">
            数あるアイテムの中から、本当に紹介したいものだけをセレクト。
            数より質にこだわっています。
          </p>
        </li>
        <li className="about__feature">
          <span className="about__feature-icon" aria-hidden="true">
            🎨
          </span>
          <h3 className="about__feature-title">見て楽しいデザイン</h3>
          <p className="about__feature-text">
            眺めているだけでワクワクするような、写真とレイアウトにこだわりました。
          </p>
        </li>
        <li className="about__feature">
          <span className="about__feature-icon" aria-hidden="true">
            🌿
          </span>
          <h3 className="about__feature-title">毎日に、そっと馴染む</h3>
          <p className="about__feature-text">
            派手すぎず、なくても困らないけれど、あると毎日が少し楽しくなる。
            そんなアイテムを紹介しています。
          </p>
        </li>
      </ul>

      <section className="about__cta">
        <h2 className="about__cta-title">お気に入りを、見つけにいこう。</h2>
        <p className="about__cta-text">
          気になったアイテムはハートボタンでお気に入り登録。
          あとからゆっくり見比べることができます。
        </p>
        <Link to="/" className="about__cta-button">
          アイテムを見る <span aria-hidden="true">→</span>
        </Link>
      </section>
    </div>
  );
}
