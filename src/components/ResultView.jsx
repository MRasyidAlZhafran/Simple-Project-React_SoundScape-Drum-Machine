import React from 'react';

const ResultView = ({ score, total, category, onRestart, onHome }) => {
  const percentage = Math.round((score / total) * 100);
  
  let message = "Keep learning!";
  let emoji = "📚";
  
  if (percentage === 100) {
    message = "Perfect Score! You're a genius!";
    emoji = "🏆";
  } else if (percentage >= 70) {
    message = "Great job! Almost perfect.";
    emoji = "🌟";
  } else if (percentage >= 50) {
    message = "Not bad! You're getting there.";
    emoji = "👍";
  }

  return (
    <div className="animate-fade-in" style={{ textAlign: 'center' }}>
      <header style={{ marginBottom: '3rem' }}>
        <h1>Results</h1>
        <p>You've completed the {category} quiz!</p>
      </header>

      <div className="glass-card" style={{ padding: '3.5rem' }}>
        <span style={{ fontSize: '5rem', marginBottom: '1.5rem', display: 'block' }}>{emoji}</span>
        <h2 style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>{score} / {total}</h2>
        <p style={{ fontSize: '1.2rem', color: 'var(--text-main)', marginBottom: '1.5rem' }}>{message}</p>
        
        <div style={{ 
          width: '100%', 
          height: '12px', 
          background: 'rgba(255,255,255,0.1)', 
          borderRadius: '20px', 
          marginBottom: '3rem', 
          overflow: 'hidden',
          position: 'relative'
        }}>
          <div style={{ 
            width: `${percentage}%`, 
            height: '100%', 
            background: 'linear-gradient(to right, var(--primary), var(--secondary))',
            borderRadius: '20px'
          }}></div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <button onClick={onRestart} className="btn btn-primary" style={{ padding: '1.2rem' }}>
            Try Again
          </button>
          <button onClick={onHome} className="btn btn-outline" style={{ padding: '1.2rem' }}>
            Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResultView;
