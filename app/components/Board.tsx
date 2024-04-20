'use client'
import React, { useRef, useEffect, useState } from 'react';
import ToolBar from './ToolBar';

type DrawingTool = 'pencil' | 'eraser';
type Color = string;

interface DrawingState {
  isDrawing: boolean;
  tool: DrawingTool;
  color: Color;
  lastX: number | null;
  lastY: number | null;
}

const initialDrawingState: DrawingState = {
  isDrawing: false,
  tool: 'pencil',
  color: '#000000',
  lastX: null,
  lastY: null,
};

interface BoardProps {
  onToolChange: (tool: DrawingTool) => void;
  onColorChange: (color: Color) => void;
}

const Board: React.FC<BoardProps> = ({ onToolChange, onColorChange }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [drawingState, setDrawingState] = useState<DrawingState>(initialDrawingState);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');

    if (!ctx) return;

    const startDrawing = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      setDrawingState((prevState) => ({
        ...prevState,
        isDrawing: true,
        lastX: clientX,
        lastY: clientY,
      }));
    };

    const draw = (e: MouseEvent) => {
      if (!drawingState.isDrawing) return;

      const { clientX, clientY } = e;
      ctx.beginPath();
      ctx.strokeStyle = drawingState.color;
      ctx.lineWidth = drawingState.tool === 'pencil' ? 2 : 10;
      ctx.moveTo(drawingState.lastX || clientX, drawingState.lastY || clientY);
      ctx.lineTo(clientX, clientY);
      ctx.stroke();
      setDrawingState((prevState) => ({
        ...prevState,
        lastX: clientX,
        lastY: clientY,
      }));
    };

    const stopDrawing = () => {
      setDrawingState((prevState) => ({
        ...prevState,
        isDrawing: false,
      }));
    };

    canvas.addEventListener('mousedown', startDrawing);
    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('mouseup', stopDrawing);

    return () => {
      canvas.removeEventListener('mousedown', startDrawing);
      canvas.removeEventListener('mousemove', draw);
      canvas.removeEventListener('mouseup', stopDrawing);
    };
  }, [drawingState]);

  const handleToolChange = (tool: DrawingTool) => {
    setDrawingState((prevState) => ({
      ...prevState,
      tool,
    }));
    onToolChange(tool);
  };

  const handleColorChange = (color: Color) => {
    setDrawingState((prevState) => ({
      ...prevState,
      color,
    }));
    onColorChange(color);
  };

  return (
    <div>
      <ToolBar onToolChange={handleToolChange} onColorChange={handleColorChange} />
      <canvas ref={canvasRef} width="800" height="600" />
    </div>
  );
};

export default Board;