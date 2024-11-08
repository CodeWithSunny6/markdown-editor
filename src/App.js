// src/App.js
import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Editor from './Editor';

function App() {
  const [notes, setNotes] = useState([
    { id: 1, title: 'Main Note 1', content: '# Main Note 1 Content', subNotes: [] },
    { id: 2, title: 'Main Note 2', content: '## Main Note 2 Content', subNotes: [] },
  ]);
  const [selectedNote, setSelectedNote] = useState(notes[0]);
  const [markdown, setMarkdown] = useState(notes[0].content);
  const [isPreviewMode, setIsPreviewMode] = useState(false);

  // Select the note and load its content
  const handleSelectNote = (note) => {
    setSelectedNote(note);
    setMarkdown(note.content);
    setIsPreviewMode(false); // Reset to edit mode when a new note is selected
  };

  // Save the current note content to the selected note
  const handleSaveNote = () => {
    const updateNotes = (noteList) => 
      noteList.map(note =>
        note.id === selectedNote.id
          ? { ...note, content: markdown }
          : { ...note, subNotes: updateNotes(note.subNotes) }
      );
    
    setNotes(updateNotes(notes));
    alert('Note saved!');
  };

  // Delete the currently selected note
  const handleDeleteNote = () => {
    const deleteNote = (noteList) =>
      noteList
        .filter(note => note.id !== selectedNote.id)
        .map(note => ({
          ...note,
          subNotes: deleteNote(note.subNotes),
        }));

    setNotes(deleteNote(notes));
    setSelectedNote(notes[0] || {}); // Reset to the first note if available
    setMarkdown(notes[0]?.content || ''); // Clear content if no notes left
  };

  // Add a sub-note under the currently selected note
  const handleAddSubNote = () => {
    const newSubNote = {
      id: Date.now(), // Unique ID based on timestamp
      title: `Sub Note ${selectedNote.subNotes.length + 1}`,
      content: '### New Sub Note Content',
      subNotes: [],
    };

    const addSubNoteToSelected = (noteList) =>
      noteList.map(note => {
        if (note.id === selectedNote.id) {
          return { ...note, subNotes: [...note.subNotes, newSubNote] };
        }
        return { ...note, subNotes: addSubNoteToSelected(note.subNotes) };
      });

    setNotes(addSubNoteToSelected(notes));
    setSelectedNote(newSubNote); // Select the new sub-note
    setMarkdown(newSubNote.content);
  };

  // Toggle between edit and preview modes
  const togglePreview = () => {
    setIsPreviewMode(!isPreviewMode); // Toggle the preview mode
  };

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      {/* Sidebar */}
      <Sidebar notes={notes} onSelectNote={handleSelectNote} />

      {/* Editor/Preview */}
      <Editor
        markdown={markdown}
        onMarkdownChange={setMarkdown}
        onSaveNote={handleSaveNote}
        onDeleteNote={handleDeleteNote}
        onAddSubNote={handleAddSubNote}
        isPreviewMode={isPreviewMode} // Pass preview mode
        togglePreview={togglePreview} // Pass toggle function
      />
    </div>
  );
}

export default App;
