import React, { useState } from 'react';
import Results from './result'; // Resultsコンポーネントをインポート
import Text from './text'; // Textコンポーネントをインポート

function Search() {
  const [query, setQuery] = useState(''); // 検索キーワード
  const [showResults, setShowResults] = useState(false); // 結果を表示するかどうか
  const [selectedPageId, setSelectedPageId] = useState(null); // 選択されたページID

  const handleSearch = (e) => {
    e.preventDefault();
    if (query) {
      setShowResults(true); // 検索後に結果を表示
    }
  };

  const handleResultClick = (pageId) => {
    setSelectedPageId(pageId); // クリックされた検索結果のページIDを設定
    setShowResults(false); // 結果表示を一旦非表示にして本文表示
  };

  return (
    <div>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Enter search term"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>

      {showResults && <Results query={query} onResultClick={handleResultClick} />} {/* 検索結果を表示 */}

      {selectedPageId && <Text pageId={selectedPageId} />} {/* クリックされた結果の本文を表示 */}
    </div>
  );
}

export default Search;
