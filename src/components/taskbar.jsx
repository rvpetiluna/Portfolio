// components/taskbar.jsx
import React from 'react';

export default function Taskbar({ windowState, onTaskClick }) {
    const date = new Date();

    // Standard OS time/date formatting
    const formattedTime = date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
    const formattedDate = date.toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' });

    return (
        <nav className="taskbar">
            <div className="start_button">
                <i className="hn hn-windows"></i> Start
            </div>
            
            <div className="running_apps">
                {/* Check if windowState exists, then map through keys */}
                {windowState && Object.keys(windowState).map((id) => {
                    const win = windowState[id];
                    // Only show on taskbar if the app has been "opened"
                    if (!win.isOpen) return null;

                    return (
                        <div 
                            key={id} 
                            className={`task_item ${!win.isMinimized ? 'active' : ''}`}
                            onClick={() => onTaskClick(id)}
                        >
                            <span className="task_item_text">{id}</span>
                        </div>
                    );
                })}
            </div>
            
            <div className="taskbar_date_time">
                <div>{formattedTime}</div>
                <div>{formattedDate}</div>
            </div>
        </nav>
    );
}