// src/components/Home.js
import React, { useEffect,useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './home/header';
import Pass from './home/pass';
import Main from './home/main';

function Home() {
  const [selectedBusiness, setSelectedBusiness] = useState('');

  const handleSelectBusiness = (business) => {
    setSelectedBusiness(business); 
  };

  const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setIsLoggedIn(true);  // トークンがあればログイン済み
        } else {
            //navigate('/login');  // トークンがなければログインページへリダイレクト
        }
    }, [navigate]);

    if (!isLoggedIn) {
        return null; // ログインしていない場合は何も表示しない
    }

  return (
    <div>
      <Header onSelectBusiness={handleSelectBusiness} />
      <Pass business={selectedBusiness} />
      <Main business={selectedBusiness} />
    </div>
  );
}

export default Home;
