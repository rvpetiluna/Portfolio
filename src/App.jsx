import { useState, useEffect } from 'react'
import './index.css'
import Taskbar from './components/taskbar';
import DesktopIcon from './components/DesktopIcon';
import Aboutme from './Contents/AboutMe';

function App() {

  useEffect(() => {
    const handleContextMenu = (e) => {
      e.preventDefault(); // Prevent default right-click menu
    };
    document.addEventListener('contextmenu', handleContextMenu);
    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
    };
  }, []);

  return (
    <>
      <div className="wallpaper"/>
      <div className="desktop">
        <DesktopIcon 
          icon="hn hn-user-solid" 
          iconName="About Me"
          modalContent={<Aboutme />}
        />
        <DesktopIcon 
          icon="hn hn-folder-solid" 
          iconName="Featured Projects"
          modalContent={<p>Projects here</p>}
        />
        <DesktopIcon 
          icon="hn hn-phone-ringing-high-solid" 
          iconName="Contact"
          modalContent={<p>Contact information here</p>}
        />
        <DesktopIcon 
          icon="hn hn-gaming" 
          iconName="Mini Games"
          modalContent={<p>Games here</p>}
        />
      </div>
        
      <Taskbar />
    </>
  )
}

export default App
