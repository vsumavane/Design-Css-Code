import React, { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addLayer } from '../redux/layersSlice';

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
    if (selectedTool === 'rectangle') {
      const rect = artboardRef.current.getBoundingClientRect();
      const startX = e.clientX - rect.left;
      const startY = e.clientY - rect.top;
      setStartPos({ x: startX, y: startY });
      setIsDrawing(true);
    } else if (selectedTool === 'circle') {
      const circle = artboardRef.current.getBoundingClientRect();
      const startX = e.clientX - circle.left;
      const startY = e.clientY - circle.top;
      setStartPos({ x: startX, y: startY });
      setIsDrawing(true);
    }
  };

  // Handle Mouse Move (Update Rectangle Size)
  const handleMouseMove = (e) => {
    if (!isDrawing) return;

    const shape = artboardRef.current.getBoundingClientRect();
    const endX = e.clientX - shape.left;
    const endY = e.clientY - shape.top;

    let width = Math.abs(endX - startPos.x);
    let height = Math.abs(endY - startPos.y);

    // Make square/circle when shift is pressed
    if (isShiftPressed) {
      const size = Math.max(width, height);
      width = size;
      height = size;
    }

    if (selectedTool === 'rectangle') {
      const newX = endX >= startPos.x ? startPos.x : startPos.x - width;
      const newY = endY >= startPos.y ? startPos.y : startPos.y - height;

      setCurrentRect({
        x: newX,
        y: newY,
        width,
        height,
      });
    } else if (selectedTool === 'circle') {
      const newX = endX >= startPos.x ? startPos.x : startPos.x - width;
      const newY = endY >= startPos.y ? startPos.y : startPos.y - height;

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

  return (
    <div
      ref={artboardRef}
      style={{
        width: '100%',
        height: '100%',
        border: '2px solid #d1d5db',
        position: 'relative',
        backgroundColor: 'white',
        cursor: selectedTool === 'rectangle' || selectedTool === 'circle' ? 'crosshair' : 'default',
        overflow: 'hidden',
      }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
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
  );
};

export default Artboard;
