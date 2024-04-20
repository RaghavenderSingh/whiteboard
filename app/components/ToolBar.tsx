'use client'
import React from 'react';

type DrawingTool = 'pencil' | 'eraser';
type Color = string;

interface ToolBarProps {
  onToolChange: (tool: DrawingTool) => void;
  onColorChange: (color: Color) => void;
}

const ToolBar: React.FC<ToolBarProps> = ({ onToolChange, onColorChange }) => {
  const handleToolChange = (tool: DrawingTool) => {
    onToolChange(tool);
  };

  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onColorChange(e.target.value);
  };

  return (
    <div>
      <button onClick={() => handleToolChange('pencil')}>Pencil</button>
      <button onClick={() => handleToolChange('eraser')}>Eraser</button>
      <input type="color" onChange={handleColorChange} />
    </div>
  );
};

export default ToolBar;