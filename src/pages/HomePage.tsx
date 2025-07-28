import React from 'react';
import './HomePage.css';

interface Note {
  id: number;
  title: string;
}

const HomePage: React.FC = () => {
  const [notes, setNotes] = React.useState<Note[]>([
    { id: 1, title: 'Note 1' },
    { id: 2, title: 'Note 2' },
  ]);
  
  const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const userEmail = 'xxxxxx@xxxx.com';

  return (
    <div className="app-container">
      <div className="time-display">{currentTime}</div>
      
      <div className="welcome-section">
        <h1>Welcome, Jonas Kahnwald !</h1>
        <p>Email: {userEmail}</p>
      </div>
      
      <button className="create-note-button">Create Note</button>
      
      <div className="notes-section">
        <h2>Notes</h2>
        <div className="notes-list">
          {notes.map(note => (
            <div key={note.id} className="note-item">
              {note.title}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
