// src/Sidebar.js
import React from 'react';

function Sidebar({ notes, onSelectNote }) {
  const renderNotes = (noteList, level = 0) => {
    return noteList.map((note) => (
      <div key={note.id}>
        <div
          onClick={() => onSelectNote(note)}
          style={{
            cursor: 'pointer',
            padding: '5px',
            paddingLeft: `${20 * level}px`, // Indentation based on hierarchy level
            borderBottom: '1px solid #ddd',
            fontWeight: level === 0 ? 'bold' : 'normal',
          }}
        >
          {note.title}
        </div>
        {note.subNotes && renderNotes(note.subNotes, level + 1)}
      </div>
    ));
  };

  return (
    <div style={{ width: '20%', padding: '10px', borderRight: '1px solid #ccc' }}>
      <h3>Notes</h3>
      {renderNotes(notes)}
      <button
        style={{ marginTop: '20px', cursor: 'pointer' }}
        onClick={() =>
          onSelectNote({ id: Date.now(), title: 'New Note', content: '', subNotes: [] })
        }
      >
        + New Main Note
      </button>
    </div>
  );
}

export default Sidebar;
