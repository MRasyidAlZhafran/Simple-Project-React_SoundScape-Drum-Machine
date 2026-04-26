import React from 'react';

const CategorySelection = ({ categories, onSelect }) => {
  return (
    <div className="animate-fade-in">
      <header style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h1>FlashMind</h1>
        <p>Choose a category to test your knowledge</p>
      </header>
      
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', 
        gap: '1.5rem' 
      }}>
        {categories.map((cat) => (
          <div 
            key={cat.id} 
            className="glass-card" 
            style={{ 
              cursor: 'pointer', 
              padding: '1.5rem',
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '1rem'
            }}
            onClick={() => onSelect(cat)}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-5px)';
              e.currentTarget.style.borderColor = 'var(--primary)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.borderColor = 'var(--glass-border)';
            }}
          >
            <span style={{ fontSize: '3rem' }}>{cat.icon}</span>
            <h3 style={{ fontSize: '1.2rem', fontWeight: '600' }}>{cat.category}</h3>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              {cat.questions.length} Questions
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategorySelection;
