import React, { useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addLayer } from '../redux/layersSlice';
import Draggable from 'react-draggable';

const Artboard = () => {
  const dispatch = useDispatch();
  const { layers } = useSelector((state) => state.layers);
  const { selectedTool } = useSelector((state) => state.tools);

  // Drawing state
  const [isDrawing, setIsDrawing] = useState(false);
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });
  const [currentRect, setCurrentRect] = useState(null);

  const artboardRef = useRef(null);

  // Add New Element
  const handleMouseDown = (e) => {
    if (selectedTool === 'rectangle') {
      const rect = artboardRef.current.getBoundingClientRect();
      const startX = e.clientX - rect.left;
      const startY = e.clientY - rect.top;
      setStartPos({ x: startX, y: startY });
      setIsDrawing(true);
    }
  };

  // Handle Mouse Move (Update Rectangle Size)
  const handleMouseMove = (e) => {
    if (!isDrawing) return;

    const rect = artboardRef.current.getBoundingClientRect();
    const endX = e.clientX - rect.left;
    const endY = e.clientY - rect.top;

    const width = Math.abs(endX - startPos.x);
    const height = Math.abs(endY - startPos.y);

    setCurrentRect({
      x: Math.min(startPos.x, endX),
      y: Math.min(startPos.y, endY),
      width,
      height,
    });
  };

  // Handle Mouse Up (Add Final Rectangle to Layers)
  const handleMouseUp = () => {
    if (isDrawing && currentRect) {
      const newLayer = {
        id: `rect-${Date.now()}`,
        type: 'rectangle',
        x: currentRect.x,
        y: currentRect.y,
        width: currentRect.width,
        height: currentRect.height,
      };
      dispatch(addLayer(newLayer));
    }
    setIsDrawing(false);
    setCurrentRect(null);
  };

  return (
    <div
      ref={artboardRef}
      className="w-full h-full border-2 border-gray-300 relative bg-white"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      {layers.map((el) => (
        <div
          className="absolute border bg-blue-300"
          style={{
            left: el.x,
            top: el.y,
            width: el.width,
            height: el.height,
          }}
        />
      ))}
      {isDrawing && currentRect && (
        <div
          className="absolute border bg-blue-300"
          style={{
            left: currentRect.x,
            top: currentRect.y,
            width: currentRect.width,
            height: currentRect.height,
          }}
        />
      )}
    </div>
  );
};

export default Artboard;
