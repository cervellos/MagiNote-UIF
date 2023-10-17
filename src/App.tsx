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

  return (
    <div className="app-container">
      <form
        className="note-form"
        onSubmit={(event) => {
          hanbleAddNote(event);
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
        <button type="submit">Add Note</button>
      </form>
      <div className="notes-grid">
        {notes.map((notes) => (
          <div className="notes-item" onClick={() => handleNoteClick(notes)}>
            <div className="notes-header">
              <button>x</button>
            </div>
            <h2>{notes.title}</h2>
            <p>{notes.content}</p>
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
