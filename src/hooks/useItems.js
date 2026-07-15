// src/hooks/useItems.js
import { useState, useEffect } from "react";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "../firebase.js";

export function useItems() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  // 一覧を読み込む（書き込み後の再取得にも使うので関数にしておく）
  const load = async () => {
    const snapshot = await getDocs(collection(db, "items"));
    setItems(snapshot.docs.map((d) => ({ id: d.id, ...d.data() })));
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  // 追加：ドキュメントIDはFirestoreが自動で振る
  const add = async (data) => {
    await addDoc(collection(db, "items"), data);
    await load(); // 書いたら読み直して画面に反映
  };

  // 編集：idでドキュメントを指定して上書き
  const update = async (id, data) => {
    await updateDoc(doc(db, "items", id), data);
    await load();
  };

  // 削除
  const remove = async (id) => {
    await deleteDoc(doc(db, "items", id));
    await load();
  };

  return { items, loading, add, update, remove };
}
