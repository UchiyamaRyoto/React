// src/components/Header.js
import React, { useState } from 'react';
import '../../style/header.css';

function Header({ onSelectBusiness }) {
  const [selectedBusiness, setSelectedBusiness] = useState('加工業務');

  // タブがクリックされたときに呼び出される関数
  const handleClick = (business) => {
    setSelectedBusiness(business); // 選択された業務をstateに保存
    onSelectBusiness(business); // 親コンポーネントに選択された業務を伝える
  };

  return (
    <header>
      <div className="row" style={{ padding: '10px' }}>
        <div className="col-12">
          <ul className="nav nav-tabs">
            <li className="nav-item" onClick={() => handleClick('加工業務')}>
              <a
                href="#kakou"
                className={`nav-link ${selectedBusiness === '加工業務' ? 'active' : ''}`}
                data-toggle="tab"
              >
                加工業務
              </a>
            </li>
            <li className="nav-item" onClick={() => handleClick('検査業務')}>
              <a
                href="#Kensa"
                className={`nav-link ${selectedBusiness === '検査業務' ? 'active' : ''}`}
                data-toggle="tab"
              >
                検査業務
              </a>
            </li>
            <li className="nav-item" onClick={() => handleClick('出荷業務')}>
              <a
                href="#Syukka"
                className={`nav-link ${selectedBusiness === '出荷業務' ? 'active' : ''}`}
                data-toggle="tab"
              >
                出荷業務
              </a>
            </li>
            <li className="nav-item" onClick={() => handleClick('棚卸業務')}>
              <a
                href="#Tana"
                className={`nav-link ${selectedBusiness === '棚卸業務' ? 'active' : ''}`}
                data-toggle="tab"
              >
                棚卸業務
              </a>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
}

export default Header;
