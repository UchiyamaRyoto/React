import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../style/login.css';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            navigate('/home');  // すでにログインしていればHomeページにリダイレクト
        }
    }, [navigate]);

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:3002/login', { username, password });
            const { token } = response.data;
            localStorage.setItem('token', token);  // ローカルストレージにトークンを保存
            navigate('/home');  // ホームにリダイレクト
        } catch (error) {
            setError('無効な認証情報です');  // エラーメッセージを表示
        }
    };

    const handleRegister = () => {
        navigate('/register');  // 新規登録ページにリダイレクト
    };

    return (
        <div>
            <h2>ログイン</h2>
            {error && <div style={{ color: 'red' }}>{error}</div>}
            <form onSubmit={handleLogin}>
                <div className="row justify-content-center m-3">
                    <div className="col-6">
                        <label className="col-form-label2 btn-block bg-info2 text-white pl-2 login-button">ユーザーネーム:</label>
                    </div>
                    <div className="col-6">
                        <input
                            className="form-control"
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                </div>
                <div className="row justify-content-center m-3">
                    <div className="col-6">
                        <label className="col-form-label2 btn-block bg-info2 text-white pl-2 login-button">パスワード:</label>
                    </div>
                    <div className="col-6">
                        <input
                            className="form-control"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div className="row m-5"></div>
                    <div className="row justify-content-center m-3">
                        <div className="col-3">
                            <button type="submit" className="form-control">ログイン</button>
                        </div>
                        <div className="col-3">
                            <input type="button" className="form-control" value="新規登録" onClick={handleRegister}  />
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default Login;
