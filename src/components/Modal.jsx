export default function Modal({ 
  id, isOpen, isMinimized, isMaximized, onClose, onMinimize, onMaximize, 
  children, position, onMouseDown, onStartResize, title 
}) {
  if (!isOpen || isMinimized) return null;

  const style = isMaximized ? {
    top: 0, left: 0, width: '100vw', height: 'calc(100vh - 3.1rem)', zIndex: 9999
  } : {
    left: `${position.x}px`, top: `${position.y}px`, width: `${position.width}px`, height: `${position.height}px`, zIndex: position.z,
  };

  const resizers = ['t', 'b', 'l', 'r', 'tl', 'tr', 'bl', 'br'];

  return (
    <div className="modal_root" style={{ position: 'fixed', ...style }}>
      {!isMaximized && resizers.map(dir => (
        <div key={dir} className={`resizer resizer-${dir}`} onMouseDown={(e) => onStartResize(dir, e)} />
      ))}
      <div className="desktop_animation_wrapper" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        <div className='title_bar' onMouseDown={onMouseDown} onDoubleClick={onMaximize}>
            <div className="title_text" style={{marginLeft:'10px', userSelect:'none'}}>{title}</div>
            <div className="title_controls" onMouseDown={(e) => e.stopPropagation()}>
                <button className="control_btn" onClick={onMinimize}>—</button>
                <button className="control_btn" onClick={onMaximize}>▢</button>
                <button className="control_btn close_btn" onClick={onClose}>×</button>
            </div>
        </div>
        <div className="modal_body_content">{children}</div>
      </div>
    </div>
  );
}