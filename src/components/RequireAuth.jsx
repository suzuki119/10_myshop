// src/components/RequireAuth.jsx
import { Navigate } from "react-router-dom";

export default function RequireAuth({ auth, children }) {
  // セッション復元の判定が終わるまでは何も出さない（チラつき防止）
  if (auth.loading) return <p className="loading">読み込み中...</p>;
  // 未ログインならログイン画面へ
  if (!auth.user) return <Navigate to="/login" replace />;
  return children;
}
