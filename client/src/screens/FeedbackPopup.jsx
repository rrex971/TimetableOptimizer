import React, { useState } from "react";

const FeedbackPopup = ({ open, onClose }) => {
  const [rating, setRating] = useState(0);

  if (!open) return null;

  return (
    <div style={overlayStyle} onClick={onClose}>
      <div style={popupStyle} onClick={e => e.stopPropagation()}>
        <div style={headerStyle}>Please rate the timetable</div>
        <div style={starsStyle}>
          {[ 1, 2, 3, 4, 5].map(i => (
            <Star
              key={i}
              filled={i <= rating}
              onClick={() => setRating(i)}
              animate={rating > 0}
            />
          ))}
        </div>
        <button style={submitStyle} onClick={onClose}>
          Submit
        </button>
      </div>
    </div>
  );
};

const overlayStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100vw',
  height: '100vh',
  background: 'rgba(0,0,0,0.4)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 1000,
  backdropFilter: 'blur(10px)',
  WebkitBackdropFilter: 'blur(10px)'
};

const popupStyle = {
  background: '#47577f',
  borderRadius: '16px',
  padding: '32px 24px',
  minWidth: '320px',
  boxShadow: '0 4px 32px rgba(0,0,0,0.18)',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '24px',
};

const headerStyle = {
  fontSize: '1.3rem',
  fontWeight: 600,
  marginBottom: '8px',
  color: '#14b8a6',
};

const starsStyle = {
  display: 'flex',
  gap: '10px',
  marginBottom: '8px',
};

const submitStyle = {
  background: '#14b8a6',
  color: '#fff',
  border: 'none',
  borderRadius: '8px',
  padding: '8px 24px',
  fontWeight: 600,
  fontSize: '1rem',
  cursor: 'pointer',
  marginTop: '8px',
};

function Star({ filled, onClick, animate }) {
  return (
    <span
      style={{
        display: 'inline-block',
        width: 28,
        height: 28,
        cursor: 'pointer',
        position: 'relative',
        transform: `${animate ? 'scale(1.1)' : 'scale(1)'}${filled ? ' rotate(45deg)' : ''}`,
        transition: 'transform 0.15s',
      }}
      onClick={onClick}
    >
      {/* X shape using two bars */}
      <span style={{
        position: 'absolute',
        left: 13,
        top: 2,
        width: 4,
        height: 24,
        borderRadius: 2,
        background: filled ? '#14b8a6' : '#e5e7eb',
        transform: 'rotate(45deg)'
      }} />
      <span style={{
        position: 'absolute',
        left: 13,
        top: 2,
        width: 4,
        height: 24,
        borderRadius: 2,
        background: filled ? '#14b8a6' : '#e5e7eb',
        transform: 'rotate(-45deg)'
      }} />
    </span>
  );
}

export default FeedbackPopup;