// src/Preview.js
import React from 'react';
import ReactMarkdown from 'react-markdown';

function Preview({ markdown }) {
  return (
    <div style={{ width: '40%', padding: '10px', borderLeft: '1px solid #ccc' }}>
      <h3>Preview</h3>
      <ReactMarkdown>{markdown}</ReactMarkdown>
    </div>
  );
}
export default Preview;
