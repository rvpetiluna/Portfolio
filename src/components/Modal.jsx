import { useEffect, useRef } from 'react';

export default function Modal({ isOpen, isMinimized, isMaximized, onClose, onMinimize, onMaximize, children, position, onMouseDown, title }) {
  if (!isOpen || isMinimized) return null;

  const style = isMaximized ? {
    top: 0, 
    left: 0, 
    width: '100vw', 
    height: 'calc(100vh - 3.2rem)', // Adjusted to leave room for taskbar
    zIndex: 9999
  } : {
    left: `${position.x}px`, 
    top: `${position.y}px`, 
    zIndex: position.z,
    width: 'auto',   // Returns to auto-sizing from old code
    height: 'auto',
    maxWidth: '90vw',
    maxHeight: '85vh'
  };

  return (
    <div className="modal_root" style={{ position: 'fixed', ...style }}>
      <div className="desktop_animation_wrapper" style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          height: '100%',
          /* YOUR REQUESTED STYLES */
          border: '1px solid rgb(69, 69, 72)',
          borderRadius: '5px',
          overflow: 'hidden' // Keeps title bar and content inside the 5px radius
      }}>
        <div 
          className='title_bar' 
          onMouseDown={onMouseDown}
          onDoubleClick={onMaximize}>
            <div className="title_text" style={{marginLeft:'10px', userSelect:'none'}}>
              {title}
            </div>
            <div className="title_controls" onMouseDown={(e) => e.stopPropagation()}>
                <button className="control_btn" onClick={onMinimize}>—</button>
                <button className="control_btn" onClick={onMaximize}>▢</button>
                <button className="control_btn close_btn" onClick={onClose}>×</button>
            </div>
        </div>
        <div className="modal_body_content">
            {children}
        </div>
      </div>
    </div>
  );
}