import React, { useState, useRef, useEffect } from 'react';
import '@hackernoon/pixel-icon-library/fonts/iconfont.css';
import Modal from './Modal';

export default function ProjectThumbnail({ icon, iconName, modalContent }) {
    const [isHighlighted, setIsHighlighted] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const containerRef = useRef(null);
    const timerRef = useRef(null);

    // Close highlight when clicking outside
     useClickOutside(containerRef, () => {
        setIsHighlighted(false);
    });

    const handleClick = () => {
        if (timerRef.current) {
            // DOUBLE CLICK
            clearTimeout(timerRef.current);
            timerRef.current = null;
            setIsModalOpen(true);
        } else {
            // SINGLE CLICK
            setIsHighlighted(true);
            timerRef.current = setTimeout(() => {
                timerRef.current = null;
            }, 250);
        }
    };

    function useClickOutside(ref, callback) {
        useEffect(() => {
            const handleClickOutside = (event) => {
                if (ref.current && !ref.current.contains(event.target)) {
                    callback();
                }
            };

            document.addEventListener('mousedown', handleClickOutside);
            return () => {
                document.removeEventListener('mousedown', handleClickOutside);
            };
        }, [ref, callback]);
    }

    return (
        <div ref={containerRef} className="desktop_icon_wrapper">
            <div 
                onClick={handleClick}
                className="desktop_icon_container"
                style={{ 
                    border: isHighlighted ? '2px solid #0099ff57' : '2px solid #00000000',
                    backgroundColor: isHighlighted ? '#0099ff57' : '#00000000',           
                }}
            >
                <div>
                    <i className={icon} style={{ fontSize: '40px' }}></i>
                </div>
                <div className="icon_name">
                    {iconName}
                </div>
            </div>

            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <div className="desktop_animation_wrapper">
                    <div className='title_bar'>
                        <div style={{marginLeft:'10px', marginTop:'5px'}}>
                            {iconName}
                        </div>
                        <div>
                            <div className='title_bar_button' onClick={() => setIsModalOpen(false)}>
                                <i className="hn hn-times-solid"></i>
                            </div>
                        </div>
                    </div>
                    {modalContent}
                </div>
            </Modal>
        </div>
    );
}