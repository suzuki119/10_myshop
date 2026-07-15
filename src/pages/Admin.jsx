// src/pages/Admin.jsx
import { useState } from "react";
import { useItems } from "../hooks/useItems.js";
import ItemForm from "../components/ItemForm.jsx";

export default function Admin({ auth }) {
  const { items, loading, add, update, remove } = useItems();
  const [editing, setEditing] = useState(null); // 編集中の商品（nullなら新規追加）

  if (loading) return <p className="loading">読み込み中...</p>;

  const handleSubmit = async (data) => {
    if (editing) {
      await update(editing.id, data);
    } else {
      await add(data);
    }
    setEditing(null); // 保存後は新規追加モードに戻す
  };

  const handleDelete = (item) => {
    if (confirm(`「${item.name}」を削除しますか？`)) {
      remove(item.id);
    }
  };

  return (
    <div className="admin">
      <div className="admin__header">
        <h2>管理画面</h2>
        <button type="button" className="admin__logout" onClick={auth.logout}>
          ログアウト
        </button>
      </div>

      <section className="admin__form">
        <h3>{editing ? `編集中：${editing.name}` : "商品を追加"}</h3>
        {/* keyで編集対象が変わるたびにフォームを作り直す */}
        <ItemForm
          key={editing?.id ?? "new"}
          initial={editing}
          onSubmit={handleSubmit}
        />
        {editing && (
          <button
            type="button"
            className="admin__cancel"
            onClick={() => setEditing(null)}
          >
            編集をやめて新規追加に戻る
          </button>
        )}
      </section>

      <section className="admin__list">
        <h3>商品一覧（{items.length}件）</h3>
        <ul>
          {items.map((item) => (
            <li key={item.id} className="admin__row">
              <img src={item.image} alt="" className="admin__thumb" />
              <div className="admin__info">
                <p className="admin__name">{item.name}</p>
                <p className="admin__meta">
                  ¥{item.price.toLocaleString()} ／ {item.category} ／{" "}
                  {item.status === "soldout" ? "売り切れ" : "販売中"}
                </p>
              </div>
              <button type="button" onClick={() => setEditing(item)}>
                編集
              </button>
              <button
                type="button"
                className="admin__delete"
                onClick={() => handleDelete(item)}
              >
                削除
              </button>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
