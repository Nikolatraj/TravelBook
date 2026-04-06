'use client';
import React from 'react'
import { Rect, IText, FabricImage } from 'fabric';
import { Type, ImagePlus, Square } from 'lucide-react';

const AddObject = ({ canvas }) => {

  const addRectangle = () => {
    if (!canvas) return;
    const rect = new Rect({
      top: 100,
      left: 50,
      width: 100,
      height: 100,
      fill: "#926161"
    });
    canvas.add(rect);
  }

  const addText = () => {
    if (!canvas) return;
    const text = new IText('Click to edit', {
      top: 100,
      left: 100,
      fontSize: 20,
    });
    canvas.add(text);
  }

  const addImage = () => {
    if (!canvas) return;
    FabricImage.fromURL('/addpicture.jpg').then((img) => {
      img.set({
        left: 100,
        top: 100,
        selectable: true,
        name: 'placeholder',
      });
      img.scaleToWidth(100);
      canvas.add(img);
    });
  }

  const tools = [
    { label: 'Text', icon: <Type size={24} />, action: addText },
    { label: 'Photo', icon: <ImagePlus size={24} />, action: addImage },
    { label: 'Rectangle', icon: <Square size={24} />, action: addRectangle },
  ];

  return (
    <div className="flex flex-col items-center py-4 gap-2 w-16 h-full bg-white border-r border-gray-200">
      {tools.map((tool) => (
        <button
          key={tool.label}
          onClick={tool.action}
          className="flex flex-col items-center justify-center gap-1 w-14 h-14 rounded-lg hover:bg-gray-100 text-gray-600 hover:text-black transition-colors"
        >
          {tool.icon}
          <span className="text-xs">{tool.label}</span>
        </button>
      ))}
    </div>
  );
}

export default AddObject;