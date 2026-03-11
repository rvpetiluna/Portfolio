// src/App.jsx
import { useState, useEffect } from 'react'
import './index.css'
import Taskbar from './components/taskbar';
import DesktopIcon from './components/DesktopIcon';
import Aboutme from './Contents/AboutMe';
import Projects from './Contents/Projects';

function App() {
  const [maxZ, setMaxZ] = useState(100);
  const [draggingId, setDraggingId] = useState(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const [windowState, setWindowState] = useState({
    "About Me": { x: 100, y: 50, z: 10, isOpen: false, isMinimized: false, isMaximized: false },
    "Featured Projects": { x: 150, y: 100, z: 10, isOpen: false, isMinimized: false, isMaximized: false },
    "Contact": { x: 200, y: 150, z: 10, isOpen: false, isMinimized: false, isMaximized: false },
    "Mini Games": { x: 250, y: 200, z: 10, isOpen: false, isMinimized: false, isMaximized: false }
  });

  const handleCenter = (id, x, y) => {
    setWindowState(prev => ({
      ...prev,
      [id]: { ...prev[id], x, y }
    }));
  };

  const updateWin = (id, updates) => {
    const newZ = maxZ + 1;
    setMaxZ(newZ);
    setWindowState(prev => ({
      ...prev,
      [id]: { ...prev[id], ...updates, z: updates.isOpen === false ? prev[id].z : newZ }
    }));
  };

  const handleStartDrag = (id, e) => {
    updateWin(id, { isMinimized: false }); // Bring to front
    setDraggingId(id);
    setOffset({
      x: e.clientX - windowState[id].x,
      y: e.clientY - windowState[id].y
    });
  };

const handleMouseMove = (e) => {
  if (!draggingId) return;

  // 1. Get the current screen and window dimensions
  const screenWidth = window.innerWidth;
  const screenHeight = window.innerHeight;
  const taskbarHeight = 48; // 3rem
  const edgeBuffer = 100;   // Exactly 100px remains on screen

  // 2. DYNAMIC MEASUREMENT: Get the actual width of the specific window
  // We use the ID to find the element
  const modalElement = document.querySelector(`.modal_root`); 
  const winWidth = modalElement ? modalElement.getBoundingClientRect().width : 700;

  let newX = e.clientX - offset.x;
  let newY = e.clientY - offset.y;

  // --- DYNAMIC CLAMPING ---

  // LEFT LIMIT: (Negative value) 
  // If winWidth is 1000px, leftLimit is -900px.
  const leftLimit = -(winWidth - edgeBuffer);

  // RIGHT LIMIT:
  // How far right the left edge can go.
  const rightLimit = screenWidth - edgeBuffer;

  newX = Math.max(leftLimit, Math.min(newX, rightLimit));

  // Y-AXIS (Title bar safety)
  newY = Math.max(0, Math.min(newY, screenHeight - taskbarHeight - 40));

  // --- RESTORE FROM MAXIMIZE ---
  const currentWin = windowState[draggingId];
  if (currentWin.isMaximized) {
    // When pulling down, we center it based on the actual width we measured
    newX = e.clientX - (winWidth / 2);
    newY = e.clientY - 20;
    
    setWindowState(prev => ({
      ...prev,
      [draggingId]: { ...prev[draggingId], isMaximized: false, x: newX, y: newY }
    }));
    setOffset({ x: winWidth / 2, y: 20 });
    return;
  }

  setWindowState(prev => ({
    ...prev,
    [draggingId]: { ...prev[draggingId], x: newX, y: newY }
  }));
};

  const handleMouseUp = () => setDraggingId(null);

  useEffect(() => {
    if (draggingId) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [draggingId, offset]);

  return (
    <div className="os-container">
      <div className="wallpaper"/>
      <div className="desktop">
        <DesktopIcon 
          icon="hn hn-user-solid" 
          iconName="About Me"
          modalContent={<Aboutme />}
          windowPos={windowState["About Me"]}
          onOpen={() => updateWin("About Me", { isOpen: true, isMinimized: false })}
          onClose={() => updateWin("About Me", { isOpen: false })}
          onMinimize={() => updateWin("About Me", { isMinimized: true })}
          onMaximize={() => updateWin("About Me", { isMaximized: !windowState["About Me"].isMaximized })}
          onStartDrag={(e) => handleStartDrag("About Me", e)}
        />
        <DesktopIcon 
          icon="hn hn-folder-solid" 
          iconName="Featured Projects"
          modalContent={<Projects/>}
          windowPos={windowState["Featured Projects"]}
          onOpen={() => updateWin("Featured Projects", { isOpen: true, isMinimized: false })}
          onClose={() => updateWin("Featured Projects", { isOpen: false })}
          onMinimize={() => updateWin("Featured Projects", { isMinimized: true })}
          onMaximize={() => updateWin("Featured Projects", { isMaximized: !windowState["Featured Projects"].isMaximized })}
          onStartDrag={(e) => handleStartDrag("Featured Projects", e)}
        />
        {/* Repeat exactly for Contact and Mini Games... */}
      </div>
      <Taskbar 
        windowState={windowState} 
        onTaskClick={(id) => updateWin(id, { isMinimized: !windowState[id].isMinimized })}
      />
    </div>
  )
}
export default App;