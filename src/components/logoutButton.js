import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../style/logoutButton.css';

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');  // localStorage からトークンを削除
    navigate('/login');  // ログインページにリダイレクト
  };

  return (
    <button className="logout-button" onClick={handleLogout}>
      ログアウト
    </button>
  );
};

export default LogoutButton;
