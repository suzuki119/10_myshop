// src/components/ItemForm.jsx
import { useState } from "react";

// 新規追加のときの初期値
const EMPTY = {
  name: "",
  price: 0,
  category: "",
  description: "",
  status: "onsale",
  code: "",
  color: "",
  size: "",
  image: "/images/item-dammy.webp",
};

export default function ItemForm({ initial, onSubmit }) {
  // 編集なら既存データ、新規なら空で始める
  const [form, setForm] = useState(initial ?? EMPTY);
  const [saving, setSaving] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    // priceだけ数値に変換して保存する
    setForm({ ...form, [name]: name === "price" ? Number(value) : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      // idはフォームの値に含めない（ドキュメントIDはFirestore側で管理）
      const { id, ...data } = form;
      await onSubmit(data);
      setForm(EMPTY); // 保存できたらフォームを空に戻す
    } catch (err) {
      alert("保存に失敗しました：" + err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="item-form">
      <label className="item-form__field">
        商品名
        <input name="name" value={form.name} onChange={handleChange} required />
      </label>
      <label className="item-form__field">
        価格
        <input
          name="price"
          type="number"
          min="0"
          value={form.price}
          onChange={handleChange}
          required
        />
      </label>
      <label className="item-form__field">
        カテゴリ
        <input name="category" value={form.category} onChange={handleChange} />
      </label>
      <label className="item-form__field">
        説明
        <textarea
          name="description"
          rows="3"
          value={form.description}
          onChange={handleChange}
        />
      </label>
      <label className="item-form__field">
        状態
        <select name="status" value={form.status} onChange={handleChange}>
          <option value="onsale">販売中</option>
          <option value="soldout">売り切れ</option>
        </select>
      </label>
      <label className="item-form__field">
        品番
        <input name="code" value={form.code} onChange={handleChange} />
      </label>
      <label className="item-form__field">
        カラー
        <input name="color" value={form.color} onChange={handleChange} />
      </label>
      <label className="item-form__field">
        サイズ
        <input name="size" value={form.size} onChange={handleChange} />
      </label>
      <label className="item-form__field">
        画像パス
        <input name="image" value={form.image} onChange={handleChange} />
      </label>
      <button type="submit" className="item-form__submit" disabled={saving}>
        {saving ? "保存中..." : "保存"}
      </button>
    </form>
  );
}
