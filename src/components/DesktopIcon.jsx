import React, { useState, useRef, useEffect } from 'react';
import '@hackernoon/pixel-icon-library/fonts/iconfont.css';
import Modal from './Modal';

export default function DesktopIcon({ icon, iconName, modalContent, windowPos, onStartDrag, onOpen, onClose, onMinimize, onMaximize }) {
    const [isHighlighted, setIsHighlighted] = useState(false);
    const containerRef = useRef(null);
    const timerRef = useRef(null);

    // Safety check: if windowPos hasn't loaded yet, don't crash
    if (!windowPos) return null;

    // Handle clicking outside to remove highlight
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (containerRef.current && !containerRef.current.contains(event.target)) {
                setIsHighlighted(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleClick = (e) => {
        e.stopPropagation();
        if (timerRef.current) {
            // DOUBLE CLICK
            clearTimeout(timerRef.current);
            timerRef.current = null;
            setIsHighlighted(false);
            onOpen(); // Opens the window and brings to front in App.jsx
        } else {
            // SINGLE CLICK
            setIsHighlighted(true);
            timerRef.current = setTimeout(() => { timerRef.current = null; }, 250);
        }
    };

    return (
        <div ref={containerRef} className="desktop_icon_wrapper">
            <div 
                onClick={handleClick}
                className="desktop_icon_container"
                style={{ 
                    border: isHighlighted ? '2px solid #0099ff57' : '2px solid transparent',
                    backgroundColor: isHighlighted ? '#0099ff57' : 'transparent',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    cursor: 'pointer',
                    width: '100px',
                    padding: '5px'
                }}
            >
                {/* Your icon rendering logic restored */}
                <i className={icon} style={{ fontSize: '40px', color: '#fff' }}></i>
                <div className="icon_name" style={{ color: '#fff', marginTop: '5px', textAlign: 'center' }}>
                    {iconName}
                </div>
            </div>

            {/* Modal now uses global state props to handle Close/Min/Max */}
            <Modal 
                isOpen={windowPos.isOpen} 
                isMinimized={windowPos.isMinimized}
                isMaximized={windowPos.isMaximized}
                onClose={onClose}
                onMinimize={onMinimize}
                onMaximize={onMaximize}
                position={windowPos}
                onMouseDown={onStartDrag}
                title={iconName}
            >
                {modalContent}
            </Modal>
        </div>
    );
}