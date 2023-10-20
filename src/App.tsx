import { useState } from "react";
import "./App.css";

type Note = {
  id: number;
  title: string;
  content: string;
};

const App = () => {
  //Note is a exportation in Typescript, allow to vinculated "notes" with the "Note"
  const [notes, setNotes] = useState<Note[]>([
    {
      id: 1,
      title: "note title 1",
      content: "content 1",
    },
    {
      id: 2,
      title: "note title 2",
      content: "content 2",
    },
    {
      id: 3,
      title: "note title 3",
      content: "content 3",
    },
    {
      id: 4,
      title: "note title 4",
      content: "content 4",
    },
    {
      id: 5,
      title: "note title 5",
      content: "content 5",
    },
  ]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const [selectedNote, setSelectedNote] = useState<Note | null>(null);

  //add new note with click and set el value
  const handleNoteClick = (note: Note) => {
    setSelectedNote(note);
    setTitle(note.title);
    setContent(note.content);
  };

  const hanbleAddNote = (
    //take event as a paramert
    event: React.FormEvent
  ) => {
    event.preventDefault();

    const newNote: Note = {
      id: notes.length + 1,
      title: title,
      content: content,
    };
    setNotes([newNote, ...notes]);
    setTitle("");
    setContent("");
  };

  const handleUpdateNote = (event: React.FormEvent) => {
    event.preventDefault();
    if (!selectedNote) {
      return;
    }

    const updateNote: Note = {
      id: selectedNote.id,
      title: title,
      content: content,
    };
    const updateNotesList = notes.map((note) =>
      note.id === selectedNote.id ? updateNote : note
    );
    setNotes(updateNotesList);
    setTitle("");
    setContent("");
    setSelectedNote(null);
  };

  const handleCancel = () => {
    setTitle("");
    setContent("");
    setSelectedNote(null);
  };

  const deleteNote = (event: React.MouseEvent, noteId: number) => {
    event.stopPropagation();

    const updatedNotes = notes.filter((note) => note.id !== noteId);
    setNotes(updatedNotes);
  };
  return (
    <div className="app-container">
      <form
        className="note-form"
        onSubmit={(event) => {
          selectedNote ? handleUpdateNote(event) : hanbleAddNote(event);
        }}
      >
        <input
          value={title}
          //change when enter and set value Note
          onChange={(event) => setTitle(event.target.value)}
          placeholder="title"
          required
        ></input>
        <textarea
          value={content}
          //not change with enter just set value in Note
          onChange={(event) => {
            setContent(event.target.value);
          }}
          placeholder="Content"
          rows={10}
          required
        ></textarea>
        {selectedNote ? (
          <div className="edit-buttons">
            <button type="submit">Save</button>
            <button onClick={handleCancel}>Cancel</button>
          </div>
        ) : (
          <button type="submit">Add Note</button>
        )}
      </form>
      <div className="notes-grid">
        {notes.map((note) => (
          <div className="notes-item" onClick={() => handleNoteClick(note)}>
            <div className="notes-header">
              <button onClick={(event) => deleteNote(event, note.id)}>x</button>
            </div>
            <h2>{note.title}</h2>
            <p>{note.content}</p>
          </div>
        ))}
        <div className="notes-item">
          <div className="notes-header">
            <button>x</button>
          </div>
          <h2>Note Title</h2>
          <p>Note Content</p>
        </div>
      </div>
    </div>
  );
};
export default App;
