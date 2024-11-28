import logo from './logo.svg';
import './App.css';
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Search from './components/search'
import Result from './components/result'
import Login from './components/login'
import Register from './components/register'
import Home from './components/home'
import LogoutButton from './components/logoutButton'



function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, []);
  return (
    <Router>
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css"
      />

      <div className="App">
        <h1>テスト</h1>
        {isAuthenticated && <LogoutButton setIsAuthenticated={setIsAuthenticated} />}
        <Routes>
          <Route exact path="/" element={<Search />}></Route>
          <Route path="/results" element={<Result />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route
            path="/home"
            element={isAuthenticated ? <Home /> : <Navigate to="/login" />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
