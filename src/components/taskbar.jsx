import React, { useState } from 'react';

export default function Taskbar() {
    const date = new Date();

    const formattedTime = date.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
    });

    const formattedDate = date.toLocaleDateString('en-US', {
        month: '2-digit',
        day: '2-digit',
        year: 'numeric'
    });


    return (
        <nav className="taskbar">
            <div>
                Taskbar
            </div>
            
            <div className="taskbar_date_time">
                <div>{formattedTime}</div>
                <div>{formattedDate}</div>
            </div>
        </nav>
    );
}