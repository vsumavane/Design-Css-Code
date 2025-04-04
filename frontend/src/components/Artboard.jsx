import React, { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addLayer } from '../redux/layersSlice';
import PenTool from './ui/pen-tool';

const Artboard = () => {
  const dispatch = useDispatch();
  const { layers } = useSelector((state) => state.layers);
  const { selectedTool } = useSelector((state) => state.tools);

  // Drawing state
  const [isDrawing, setIsDrawing] = useState(false);
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });
  const [currentRect, setCurrentRect] = useState(null);
  const [currentCircle, setCurrentCircle] = useState(null);
  const [isShiftPressed, setIsShiftPressed] = useState(false);
  // Canvas size state
  const [canvasSize, setCanvasSize] = useState({
    width: 800,
    height: 600,
    scale: 1,
  });
  const canvasRef = useRef(null);
  const artboardRef = useRef(null);

  // Add event listeners for keyboard
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Shift') setIsShiftPressed(true);
    };

    const handleKeyUp = (e) => {
      if (e.key === 'Shift') setIsShiftPressed(false);
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  // Add New Element
  const handleMouseDown = (e) => {
    if (selectedTool === 'rectangle' || selectedTool === 'circle') {
      const rect = canvasRef.current.getBoundingClientRect();
      // Calculate starting position accounting for scale
      const startX = (e.clientX - rect.left) / canvasSize.scale;
      const startY = (e.clientY - rect.top) / canvasSize.scale;
      setStartPos({ x: startX, y: startY });
      setIsDrawing(true);
    }
  };

  // Handle Mouse Move (Update Rectangle Size)
  const handleMouseMove = (e) => {
    if (!isDrawing) return;

    const rect = canvasRef.current.getBoundingClientRect();
    // Calculate current position accounting for scale
    const currentX = (e.clientX - rect.left) / canvasSize.scale;
    const currentY = (e.clientY - rect.top) / canvasSize.scale;

    let width = Math.abs(currentX - startPos.x);
    let height = Math.abs(currentY - startPos.y);

    // Make square/circle when shift is pressed
    if (isShiftPressed) {
      const size = Math.max(width, height);
      width = size;
      height = size;
    }

    // Calculate the top-left corner of the shape
    const newX = currentX >= startPos.x ? startPos.x : startPos.x - width;
    const newY = currentY >= startPos.y ? startPos.y : startPos.y - height;

    if (selectedTool === 'rectangle') {
      setCurrentRect({
        x: newX,
        y: newY,
        width,
        height,
      });
    } else if (selectedTool === 'circle') {
      setCurrentCircle({
        x: newX,
        y: newY,
        width,
        height,
      });
    }
  };

  // Handle Mouse Up (Add Final Rectangle to Layers)
  const handleMouseUp = () => {
    if (isDrawing) {
      if (selectedTool === 'rectangle' && currentRect) {
        const newLayer = {
          id: `rect-${Date.now()}`,
          type: 'rectangle',
          x: currentRect.x,
          y: currentRect.y,
          width: currentRect.width,
          height: currentRect.height,
          visible: true,
        };
        dispatch(addLayer(newLayer));
        setCurrentRect(null);
      } else if (selectedTool === 'circle' && currentCircle) {
        const newLayer = {
          id: `circle-${Date.now()}`,
          type: 'circle',
          x: currentCircle.x,
          y: currentCircle.y,
          width: currentCircle.width,
          height: currentCircle.height,
          visible: true,
        };
        dispatch(addLayer(newLayer));
        setCurrentCircle(null);
      }
    }
    setIsDrawing(false);
  };

  // Handle zoom functionality with scroll wheel
  const handleOnScroll = (e) => {
    // Check if Cmd key (Mac) or Ctrl key is pressed
    if (e.metaKey || e.ctrlKey) {
      e.preventDefault(); // Prevent default scrolling behavior

      const delta = e.deltaY;

      // Calculate new scale (zoom in when scrolling up, zoom out when scrolling down)
      let newScale = canvasSize.scale;
      if (delta < 0) {
        // Zoom in (scroll up)
        newScale = Math.min(canvasSize.scale * 1.1, 5); // Limit max zoom to 5x
      } else {
        // Zoom out (scroll down)
        newScale = Math.max(canvasSize.scale * 0.9, 0.1); // Limit min zoom to 0.1x
      }

      setCanvasSize({
        ...canvasSize,
        scale: newScale,
      });
    }
  };

  // Add wheel event listener
  useEffect(() => {
    const artboard = artboardRef.current;
    if (artboard) {
      artboard.addEventListener('wheel', handleOnScroll, { passive: false });
      return () => {
        artboard.removeEventListener('wheel', handleOnScroll);
      };
    }
  }, [canvasSize.scale]);

  return (
    <div
      ref={artboardRef}
      style={{
        width: '100%',
        height: '100%',
        border: '2px solid #d1d5db',
        position: 'relative',
        backgroundColor: 'gray',
        cursor: selectedTool === 'rectangle' || selectedTool === 'circle' ? 'crosshair' : 'default',
        overflow: 'scroll',
      }}
    >
      <div
        ref={canvasRef}
        style={{
          position: 'absolute',
          width: canvasSize.width,
          height: canvasSize.height,
          border: '2px solid #d1d5db',
          backgroundColor: 'white',
          scrollBehavior: 'smooth',
          scale: canvasSize.scale,
        }}
        onScroll={handleOnScroll}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      >
        <PenTool />
        {layers.map((el) => (
          <div
            key={el.id}
            style={{
              visibility: el.visible ? 'visible' : 'hidden',
              position: 'absolute',
              border: '1px solid',
              backgroundColor: '#93c5fd',
              left: el.x,
              top: el.y,
              width: el.width,
              height: el.height,
              borderRadius: el.type === 'circle' ? '50%' : '0',
            }}
          />
        ))}
        {isDrawing && currentRect && (
          <div
            style={{
              position: 'absolute',
              border: '1px dashed',
              backgroundColor: '#93c5fd',
              opacity: 0.5,
              left: currentRect.x,
              top: currentRect.y,
              width: currentRect.width,
              height: currentRect.height,
            }}
          />
        )}
        {isDrawing && currentCircle && (
          <div
            style={{
              position: 'absolute',
              border: '1px dashed',
              backgroundColor: '#93c5fd',
              opacity: 0.5,
              left: currentCircle.x,
              top: currentCircle.y,
              width: currentCircle.width,
              height: currentCircle.height,
              borderRadius: '50%',
            }}
          />
        )}
      </div>
    </div>
  );
};

export default Artboard;
