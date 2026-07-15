// src/pages/Login.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login({ auth }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await auth.login(email, password);
      navigate("/admin"); // 成功したら管理画面へ
    } catch {
      // どちらが間違いか教えない（登録済みメールの推測をさせないため）
      setError("メールアドレスまたはパスワードが違います");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="login">
      <h2>管理者ログイン</h2>
      {error && <p className="login__error">{error}</p>}
      <label className="item-form__field">
        メールアドレス
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="email"
          required
        />
      </label>
      <label className="item-form__field">
        パスワード
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="current-password"
          required
        />
      </label>
      <button type="submit" className="item-form__submit">
        ログイン
      </button>
    </form>
  );
}
