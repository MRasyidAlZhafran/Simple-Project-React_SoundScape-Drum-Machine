import React, { useState } from 'react';
import DrumPad from './components/DrumPad';
import { drumPads } from './data/sounds';

function App() {
  const [display, setDisplay] = useState('Ready');
  const [volume, setVolume] = useState(0.5);

  const updateDisplay = (name) => setDisplay(name.replace(/-/g, ' '));

  const handleVolume = (e) => {
    setVolume(e.target.value);
    setDisplay(`Volume: ${Math.round(e.target.value * 100)}%`);
  };

  return (
    <div className="machine-container" id="drum-machine">
      <h1>SoundScape</h1>
      
      <div className="display-panel" id="display">
        <div className="display-text">{display}</div>
      </div>

      <div className="pad-grid">
        {drumPads.map((pad) => (
          <DrumPad 
            key={pad.id} 
            pad={pad} 
            updateDisplay={updateDisplay} 
            volume={volume}
          />
        ))}
      </div>

      <div className="controls">
        <label>VOLUME</label>
        <input type="range" min="0" max="1" step="0.01" value={volume} onChange={handleVolume} />
      </div>
    </div>
  );
}

export default App;
