import { useState, useEffect } from 'react'
import './index.css'
import Taskbar from './components/taskbar';
import DesktopIcon from './components/DesktopIcon';
import Aboutme from './Contents/AboutMe';
import Projects from './Contents/Projects';

function App() {
  const [maxZ, setMaxZ] = useState(100);
  const [draggingId, setDraggingId] = useState(null);
  const [resizing, setResizing] = useState({ id: null, dir: null });
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const [windowState, setWindowState] = useState({
    "About Me": { 
      x: 100, y: 50, width: 700, height: 800, 
      minWidth: 400, minHeight: 800, // Higher minHeight for About Me
      z: 10, isOpen: false, isMinimized: false, isMaximized: false 
    },
    "Featured Projects": { 
      x: 150, y: 100, width: 900, height: 600, 
      minWidth: 600, minHeight: 300, // Featured Projects can go shorter
      z: 10, isOpen: false, isMinimized: false, isMaximized: false 
    },
  });

  const updateWin = (id, updates) => {
    const newZ = maxZ + 1;
    setMaxZ(newZ);
    setWindowState(prev => ({
      ...prev,
      [id]: { ...prev[id], ...updates, z: updates.isOpen === false ? prev[id].z : newZ }
    }));
  };

  const handleStartDrag = (id, e) => {
    if (windowState[id].isMaximized) return;
    updateWin(id, { isMinimized: false });
    setDraggingId(id);
    setOffset({ x: e.clientX - windowState[id].x, y: e.clientY - windowState[id].y });
  };

  const handleStartResize = (id, dir, e) => {
    e.stopPropagation();
    e.preventDefault();
    setResizing({ id, dir });
  };

  const handleMouseMove = (e) => {
    if (draggingId) {
      setWindowState(prev => ({
        ...prev,
        [draggingId]: { ...prev[draggingId], x: e.clientX - offset.x, y: e.clientY - offset.y }
      }));
    }

    if (resizing.id) {
  setWindowState(prev => {
    const win = prev[resizing.id];
    let { x, y, width, height, minWidth, minHeight } = win;
    const dir = resizing.dir;

    // Use specific constraints or fall back to defaults
    const mWidth = minWidth || 300;
    const mHeight = minHeight || 200;

    // RIGHT / LEFT
    if (dir.includes('r')) width = Math.max(mWidth, e.clientX - x);
    if (dir.includes('l')) {
      const newWidth = width + (x - e.clientX);
      if (newWidth > mWidth) { width = newWidth; x = e.clientX; }
    }

    // BOTTOM / TOP
    if (dir.includes('b')) height = Math.max(mHeight, e.clientY - y);
    if (dir.includes('t')) {
      const newHeight = height + (y - e.clientY);
      if (newHeight > mHeight) { height = newHeight; y = e.clientY; }
    }

    return { ...prev, [resizing.id]: { ...win, x, y, width, height } };
  });
}
  };

  const handleMouseUp = () => {
    setDraggingId(null);
    setResizing({ id: null, dir: null });
  };

  useEffect(() => {
    if (draggingId || resizing.id) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [draggingId, resizing]);

  return (
    <div className="os-container">
      <div className="wallpaper"/>
      <div className="desktop">
        {Object.keys(windowState).map((id) => (
          <DesktopIcon 
            key={id} id={id}
            icon={id === "About Me" ? "hn hn-user-solid" : "hn hn-folder-solid"} 
            iconName={id}
            modalContent={id === "About Me" ? <Aboutme /> : <Projects />}
            windowPos={windowState[id]}
            onOpen={() => updateWin(id, { isOpen: true, isMinimized: false })}
            onClose={() => updateWin(id, { isOpen: false })}
            onMinimize={() => updateWin(id, { isMinimized: true })}
            onMaximize={() => updateWin(id, { isMaximized: !windowState[id].isMaximized })}
            onStartDrag={(e) => handleStartDrag(id, e)}
            onStartResize={(dir, e) => handleStartResize(id, dir, e)}
          />
        ))}
      </div>
      <Taskbar windowState={windowState} onTaskClick={(id) => updateWin(id, { isMinimized: !windowState[id].isMinimized })} />
    </div>
  )
}
export default App;