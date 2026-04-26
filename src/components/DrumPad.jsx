import React, { useEffect, useState } from 'react';

const DrumPad = ({ pad, updateDisplay, volume }) => {
  const [isActive, setIsActive] = useState(false);

  const playSound = () => {
    const audio = document.getElementById(pad.keyTrigger);
    audio.currentTime = 0; // Reset ke awal jika diklik cepat
    audio.volume = volume;
    audio.play();
    
    updateDisplay(pad.id);
    setIsActive(true);
    setTimeout(() => setIsActive(false), 100); // Durasi nyala neon
  };

  useEffect(() => {
    // Listener untuk keyboard
    const handleKey = (e) => {
      if (e.keyCode === pad.keyCode) playSound();
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [volume]);

  return (
    <div
      className={`drum-pad ${isActive ? `active ${pad.color}` : ''}`}
      id={pad.id}
      onClick={playSound}
    >
      {pad.keyTrigger}
      <span>{pad.id.replace(/-/g, ' ')}</span>
      <audio className="clip" id={pad.keyTrigger} src={pad.url}></audio>
    </div>
  );
};

export default DrumPad;
