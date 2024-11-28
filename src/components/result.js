import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaSearch } from 'react-icons/fa'; // アイコンをインポート

function Results({ query, onResultClick }) {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (query) {
      axios
        .get('https://ja.wikipedia.org/w/api.php', {
          params: {
            action: 'query',
            format: 'json',
            list: 'search',
            srsearch: query,
            origin: '*', // CORS対策
            uselang: 'ja',
          },
        })
        .then((response) => {
          setResults(response.data.query.search);
          setLoading(false);
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
          setLoading(false);
        });
    }
  }, [query]);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="page-content">
      <h2>Search Results for: {query}</h2>
      {results.length === 0 ? (
        <p>No results found.</p>
      ) : (
        <ul>
          {results.map((result) => (
            <li key={result.pageid}>
              <button onClick={() => onResultClick(result.pageid)}>
                <FaSearch style={{ marginRight: '8px' }} />
                {result.title}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Results;
