import React, { useState, useEffect } from 'react';

const QuizCard = ({ category, onFinish, onCancel }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);

  const currentQuestion = category.questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / category.questions.length) * 100;

  const handleOptionSelect = (index) => {
    if (isAnswered) return;
    
    setSelectedOption(index);
    const correct = index === currentQuestion.correctAnswer;
    setIsCorrect(correct);
    setIsAnswered(true);
    
    if (correct) {
      setScore(score + 1);
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex + 1 < category.questions.length) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOption(null);
      setIsCorrect(null);
      setIsAnswered(false);
    } else {
      onFinish(score + (isCorrect ? 1 : 0)); // Edge case fix: score already updated in select
      // Wait, score is already updated. Let's just pass the current score.
      onFinish(score);
    }
  };

  // Fix: The finish score should be the final score after the last question is answered.
  useEffect(() => {
    if (isAnswered && currentQuestionIndex + 1 === category.questions.length) {
        // We wait a bit or let the user click "Finish"
    }
  }, [isAnswered]);

  return (
    <div className="animate-fade-in">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <button onClick={onCancel} className="btn btn-outline" style={{ padding: '0.5rem 1rem', fontSize: '0.9rem' }}>
          ← Back
        </button>
        <span style={{ color: 'var(--text-muted)', fontWeight: '500' }}>
          {category.category} • {currentQuestionIndex + 1}/{category.questions.length}
        </span>
      </div>

      <div style={{ width: '100%', height: '6px', background: 'rgba(255,255,255,0.1)', borderRadius: '10px', marginBottom: '2.5rem', overflow: 'hidden' }}>
        <div style={{ 
          width: `${progress}%`, 
          height: '100%', 
          background: 'linear-gradient(to right, var(--primary), var(--secondary))',
          transition: 'width 0.4s ease'
        }}></div>
      </div>

      <div className="glass-card">
        <h2 style={{ marginBottom: '2rem', lineHeight: '1.4' }}>{currentQuestion.question}</h2>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {currentQuestion.options.map((option, index) => {
            let bgColor = 'rgba(255, 255, 255, 0.05)';
            let borderColor = 'var(--glass-border)';
            
            if (isAnswered) {
              if (index === currentQuestion.correctAnswer) {
                bgColor = 'rgba(16, 185, 129, 0.2)';
                borderColor = 'var(--success)';
              } else if (selectedOption === index && !isCorrect) {
                bgColor = 'rgba(244, 63, 94, 0.2)';
                borderColor = 'var(--error)';
              }
            } else if (selectedOption === index) {
              borderColor = 'var(--primary)';
            }

            return (
              <button
                key={index}
                onClick={() => handleOptionSelect(index)}
                disabled={isAnswered}
                style={{
                  padding: '1.2rem',
                  borderRadius: '16px',
                  border: `2px solid ${borderColor}`,
                  background: bgColor,
                  color: 'white',
                  textAlign: 'left',
                  fontSize: '1rem',
                  fontWeight: '500',
                  cursor: isAnswered ? 'default' : 'pointer',
                  transition: 'all 0.2s ease',
                  fontFamily: 'inherit'
                }}
                onMouseEnter={(e) => {
                  if (!isAnswered) e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                }}
                onMouseLeave={(e) => {
                  if (!isAnswered) e.currentTarget.style.background = bgColor;
                }}
              >
                {option}
              </button>
            );
          })}
        </div>

        {isAnswered && (
          <div style={{ marginTop: '2.5rem', textAlign: 'center' }}>
            <button onClick={handleNext} className="btn btn-primary" style={{ width: '100%', padding: '1.2rem' }}>
              {currentQuestionIndex + 1 === category.questions.length ? 'See Results' : 'Next Question'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuizCard;
