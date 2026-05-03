'use client';
import React from 'react'
import { Textbox, FabricImage } from 'fabric';
import { Type, ImagePlus, LayoutTemplate, Palette, LayoutDashboard } from 'lucide-react';
import { useState, useRef } from 'react';

const CANVAS_W = 1050;
const CANVAS_H = 750;
const SPINE_LEFT = 505;
const SPINE_RIGHT = 545;
const PAGE_W = 505;

const LAYOUTS = {
  'full': (side) => {
    const left = side === 'left' ? 0 : SPINE_RIGHT;
    return [{ left, top: 0, width: PAGE_W, height: CANVAS_H }];
  },
  'one-one': (side) => {
    const left = side === 'left' ? 135 : SPINE_RIGHT + 125;
    const w = Math.floor((PAGE_W - 30) / 2);
    return [
      { left, top: 375, width: w, height: CANVAS_H - 220 },
      { left: left + w + 10, top: 375, width: w, height: CANVAS_H - 220 },
    ];
  },
  'two-one': (side) => {
    const left = side === 'left' ? 135 : SPINE_RIGHT + 125;
    const w = Math.floor((PAGE_W - 30) / 2);
    const h = Math.floor((CANVAS_H - 220 - 10) / 2);
    return [
      { left, top: 375, width: w, height: h },
      { left, top: 375 + h + 10, width: w, height: h },
      { left: left + w + 10, top: 375, width: w, height: CANVAS_H - 220 },
    ];
  },
  'four': (side) => {
    const left = side === 'left' ? 135 : SPINE_RIGHT + 125;
    const w = Math.floor((PAGE_W - 30) / 2);
    const h = Math.floor((CANVAS_H - 220 - 10) / 2);
    return [
      { left, top: 375, width: w, height: h },
      { left: left + w + 10, top: 375, width: w, height: h },
      { left, top: 375 + h + 10, width: w, height: h },
      { left: left + w + 10, top: 375 + h + 10, width: w, height: h },
    ];
  },
  'two-stacked': (side) => {
    const left = side === 'left' ? 135 : SPINE_RIGHT + 125;
    const w = PAGE_W - 270;
    const h = Math.floor((CANVAS_H - 220 - 10) / 2);
    const hw = Math.floor((w - 10) / 2);
    return [
        { left, top: 375, width: hw, height: h },
        { left: left + hw + 10, top: 375, width: hw, height: h },
        { left, top: 375 + h + 10, width: w, height: h },
    ];
},
'one-two': (side) => {
    const left = side === 'left' ? 135 : SPINE_RIGHT + 125;
    const w = PAGE_W - 270;
    const h = Math.floor((CANVAS_H - 220 - 10) / 2);
    const hw = Math.floor((w - 10) / 2);
    return [
        { left, top: 375, width: w, height: h },
        { left, top: 375 + h + 10, width: hw, height: h },
        { left: left + hw + 10, top: 375 + h + 10, width: hw, height: h },
    ];
},
  'padded': (side) => {
    const left = side === 'left' ? 185 : SPINE_RIGHT + 175;
    return [{ left, top: 425, width: PAGE_W - 370, height: CANVAS_H - 320 }];
  },
};

const LayoutPreview = ({ type }) => {
  const s = 56;
  const p = 4;
  const w = s - p * 2;
  const h = s - p * 2;
  const rects = {
  'full':        [{ x: p, y: p, w, h }],
  'one-one':     [{ x: p, y: p, w: w/2-2, h }, { x: p+w/2+2, y: p, w: w/2-2, h }],
  'two-one':     [{ x: p, y: p, w: w/2-2, h: h/2-2 }, { x: p, y: p+h/2+2, w: w/2-2, h: h/2-2 }, { x: p+w/2+2, y: p, w: w/2-2, h }],
  'four':        [{ x: p, y: p, w: w/2-2, h: h/2-2 }, { x: p+w/2+2, y: p, w: w/2-2, h: h/2-2 }, { x: p, y: p+h/2+2, w: w/2-2, h: h/2-2 }, { x: p+w/2+2, y: p+h/2+2, w: w/2-2, h: h/2-2 }],
  'two-stacked': [
    { x: p, y: p, w: w/2-2, h: h/2-2 },
    { x: p+w/2+2, y: p, w: w/2-2, h: h/2-2 },
    { x: p, y: p+h/2+2, w, h: h/2-2 },
],
'one-two': [
    { x: p, y: p, w, h: h/2-2 },
    { x: p, y: p+h/2+2, w: w/2-2, h: h/2-2 },
    { x: p+w/2+2, y: p+h/2+2, w: w/2-2, h: h/2-2 },
],
  'padded':      [{ x: p+4, y: p+4, w: w-8, h: h-8 }],
};
  return (
    <svg width={s} height={s} className="text-gray-400">
      {(rects[type] || []).map((r, i) => (
        <rect key={i} x={r.x} y={r.y} width={r.w} height={r.h} fill="#d1d5db" rx="2" />
      ))}
    </svg>
  );
};

const AddObject = ({ canvas, placeDesign, showDesignModal, setShowDesignModal, currentPage, totalPages }) => {

  const [showDesigns, setShowDesigns] = useState(false);
  const [showLayouts, setShowLayouts] = useState(false);
  const [layoutSide, setLayoutSide] = useState('left');
  const [bgColor, setBgColor] = useState('#ffffff');
  const colorInputRef = useRef(null);

  // on first page dark is on left so place on right, on last page dark is on right so place on left
  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPages - 1;
  const defaultLeft = isFirstPage ? SPINE_RIGHT + 20 : 100;
  const defaultTop = 100;

  const designs = [
    { id: 1, src: '/designs/canada.png', label: 'Canada' },
    { id: 2, src: '/designs/istambul.png', label: 'Istambul' },
    { id: 3, src: '/designs/las_vegas.png', label: 'Las Vegas' },
    { id: 4, src: '/designs/rome.png', label: 'Rome' },
  ];

  const layoutOptions = [
  { id: 'full',        label: 'Full' },
  { id: 'one-one',     label: '1+1' },
  { id: 'two-one',     label: '2+1' },
  { id: 'four',        label: '4 Grid' },
  { id: 'one-two',     label: '1+2' },
  { id: 'two-stacked', label: '2 Stacked' },
  { id: 'padded',      label: 'Padded' },
];

  const addText = () => {
    if (!canvas) return;
    const text = new Textbox('Click to edit', {
      top: defaultTop,
      left: defaultLeft,
      width: 300,
      fontFamily: 'Plus Jakarta Sans', fontSize: 30, textAlign: 'center',
      selectable: true, evented: true, stroke: 'black', strokeWidth: 0,
      borderColor: 'black', borderDashArray: [4, 4], borderScaleFactor: 2,
      backgroundColor: 'transparent', box: true,
    });
    canvas.add(text);
  };

  const addImage = () => {
    if (!canvas) return;
    FabricImage.fromURL('/elementor-placeholder-image.png').then((img) => {
      img.set({ left: defaultLeft, top: defaultTop, selectable: true, name: 'placeholder' });
      img.scaleToWidth(200);
      canvas.add(img);
    });
  };

  const handleBgColorChange = (e) => {
    const color = e.target.value;
    setBgColor(color);
    if (!canvas) return;
    canvas.backgroundColor = color;
    canvas.renderAll();
  };

  const applyLayout = async (layoutId) => {
    if (!canvas) return;
    const isLeft = layoutSide === 'left';
    canvas.getObjects()
      .filter(obj => obj.name === 'placeholder' && (isLeft ? obj.left < SPINE_LEFT : obj.left >= SPINE_RIGHT))
      .forEach(obj => canvas.remove(obj));

    const positions = LAYOUTS[layoutId](layoutSide);
    const promises = positions.map(pos =>
      FabricImage.fromURL('/elementor-placeholder-image.png').then(img => {
        img.set({
          left: pos.left, top: pos.top,
          selectable: true, name: 'placeholder',
          scaleX: pos.width / img.width,
          scaleY: pos.height / img.height,
        });
        canvas.add(img);
      })
    );
    await Promise.all(promises);
    canvas.renderAll();
    setShowLayouts(false);
  };

  const tools = [
    { label: 'Text',    icon: <Type size={24} />,           action: addText },
    { label: 'Photo',   icon: <ImagePlus size={24} />,      action: addImage },
    { label: 'Designs', icon: <LayoutTemplate size={24} />, action: () => { setShowDesigns(!showDesigns); setShowLayouts(false); } },
  ];

  return (
    <div className="flex flex-row">
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

        {currentPage !== 0 && (
          <button
            onClick={() => { setShowLayouts(!showLayouts); setShowDesigns(false); }}
            className="flex flex-col items-center justify-center gap-1 w-14 h-14 rounded-lg hover:bg-gray-100 text-gray-600 hover:text-black transition-colors"
          >
            <LayoutDashboard size={24} />
            <span className="text-xs">Layout</span>
          </button>
        )}

        <button
          onClick={() => colorInputRef.current.click()}
          className="flex flex-col items-center justify-center gap-1 w-14 h-14 rounded-lg hover:bg-gray-100 text-gray-600 hover:text-black transition-colors relative"
        >
          <Palette size={24} />
          <span className="text-xs">BG</span>
          <input
            ref={colorInputRef}
            type="color"
            value={bgColor}
            onChange={handleBgColorChange}
            className="absolute opacity-0 w-0 h-0"
          />
        </button>
      </div>

      {showDesigns && (
        <div className="w-64 h-full bg-white border-r border-gray-200 p-2 overflow-y-auto">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-semibold text-gray-700">Designs</h3>
            <button onClick={() => setShowDesigns(false)} className="text-gray-500 hover:text-black text-xl">✕</button>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {designs.map((design) => (
              <div
                key={design.id}
                onDoubleClick={() => placeDesign(design.src)}
                className="cursor-pointer rounded overflow-hidden border border-gray-200 hover:border-black transition-colors"
              >
                <img
                  src={design.src} alt={design.label} draggable
                  onDragStart={(e) => e.dataTransfer.setData('designSrc', design.src)}
                  className="w-full h-24 object-cover"
                />
                <p className="text-xs text-center text-gray-500 py-1">{design.label}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {showLayouts && (
        <div className="w-56 h-full bg-white border-r border-gray-200 p-3 overflow-y-auto">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-gray-700">Layout</h3>
            <button onClick={() => setShowLayouts(false)} className="text-gray-500 hover:text-black text-xl">✕</button>
          </div>
          <div className="flex gap-1 mb-4 bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setLayoutSide('left')}
              className={`flex-1 text-xs py-1.5 rounded-md transition-colors ${layoutSide === 'left' ? 'bg-white shadow text-black font-semibold' : 'text-gray-500'}`}
            >
              Left Page
            </button>
            <button
              onClick={() => setLayoutSide('right')}
              className={`flex-1 text-xs py-1.5 rounded-md transition-colors ${layoutSide === 'right' ? 'bg-white shadow text-black font-semibold' : 'text-gray-500'}`}
            >
              Right Page
            </button>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {layoutOptions.map((layout) => (
              <button
                key={layout.id}
                onClick={() => applyLayout(layout.id)}
                className="flex flex-col items-center gap-1 border border-gray-200 hover:border-black rounded-lg p-2 transition-colors"
              >
                <LayoutPreview type={layout.id} />
                <span className="text-xs text-gray-500">{layout.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {showDesignModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-4 w-full max-w-[800px] max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Choose a Design</h2>
              <button onClick={() => setShowDesignModal(false)} className="text-gray-500 hover:text-black text-xl">✕</button>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {designs.map((design) => (
                <div
                  key={design.id}
                  onDoubleClick={() => { placeDesign(design.src); setShowDesignModal(false); }}
                  className="cursor-pointer rounded overflow-hidden border border-gray-200 hover:border-black transition-colors"
                >
                  <img src={design.src} alt={design.label} className="w-full h-28 sm:h-36 object-contain" />
                  <p className="text-xs text-center text-gray-500 py-1">{design.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddObject;