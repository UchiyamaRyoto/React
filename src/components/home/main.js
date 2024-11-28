import React from 'react';

function Main({ business }) {

  const renderButton = () => {
    switch (business) {
      case '加工業務':
        return (
          <>
            <button className="btn btn-primary d-block w-100 mb-2">製造指図発行</button>
            <button className="btn btn-primary d-block w-100 mb-2">在庫引当指図発行</button>
            <button className="btn btn-primary d-block w-100 mb-2">在庫製造指図</button>
            <button className="btn btn-primary d-block w-100 mb-2">製造指図作成履歴</button>
          </>
        );
      case '検査業務':
        return <button className="btn btn-primary d-block w-100 mb-2">検査業務のボタン</button>;
      case '出荷業務':
        return <button className="btn btn-primary d-block w-100 mb-2">出荷業務のボタン</button>;
      case '棚卸業務':
        return <button className="btn btn-primary d-block w-100 mb-2">棚卸業務のボタン</button>;
      default:
        return <button className="btn btn-primary d-block w-100 mb-2">デフォルトのボタン</button>;
    }
  };

  return (
    <div>
      <div>{renderButton()}</div>
      {/* その他の要素 */}
    </div>
  );
}

export default Main;
