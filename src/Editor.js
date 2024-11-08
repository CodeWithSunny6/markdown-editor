// src/Editor.js
import React from 'react';
import Preview from './Preview';

function Editor({
  markdown,
  onMarkdownChange,
  onSaveNote,
  onDeleteNote,
  onAddSubNote,
  isPreviewMode,
  togglePreview,
}) {
  return (
    <div style={{ width: '40%', padding: '10px' }}>
      <h3>{isPreviewMode ? 'Preview' : 'Editor'}</h3>

      {/* Show Preview or Editor based on isPreviewMode */}
      {isPreviewMode ? (
        <Preview markdown={markdown} /> // Rendered Markdown
      ) : (
        <textarea
          style={{ width: '100%', height: '70vh' }}
          value={markdown}
          onChange={(e) => onMarkdownChange(e.target.value)}
        />
      )}


      <div style={{ marginTop: '10px' }}>
        <button onClick={togglePreview}>
          {isPreviewMode ? 'Edit' : 'Render'}
        </button>
        <button onClick={onSaveNote} style={{ marginLeft: '10px' }}>Save Note</button>
        <button onClick={onDeleteNote} style={{ marginLeft: '10px', color: 'red' }}>Delete Note</button>
        <button onClick={onAddSubNote} style={{ marginLeft: '10px' }}>Add Sub Note</button>
      </div>
    </div>
  );
}

export default Editor;
