import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../style/search.css';

function Text({ pageId }) {
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (pageId) {
      axios
        .get('https://ja.wikipedia.org/w/api.php', {
          params: {
            action: 'parse',
            format: 'json',
            pageid: pageId,
            origin: '*', // CORS対策
            prop: 'text',
            rvprop: 'content',
          },
        })
        .then((response) => {
          setContent(response.data.parse.text['*']);
          setLoading(false);

          axios.post('http://localhost:3002/add-text', { textContent: response.data.parse.text['*']})
            .then(response => {
                console.log('Text added to database:', response.data);
            })
            .catch(error => {
                console.error('Error adding text to database:', error);
            });
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
          setLoading(false);
        });
    }
  }, [pageId]);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="page-content">
      <h2>Page Content</h2>
      <div dangerouslySetInnerHTML={{ __html: content }} /> {/* HTML内容を表示 */}
    </div>
  );
}

export default Text;
