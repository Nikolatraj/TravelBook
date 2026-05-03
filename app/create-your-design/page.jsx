'use client';
import { useEffect, useRef, useState } from 'react';
import { Canvas, Line, FabricImage, Rect, Circle, Text } from 'fabric';
import Settings from './components/Settings';
import AddObject from './components/AddObject';
import DesignHeader from './components/DesignHeader';
import TextBlock from './components/TextBlock';

const TOTAL_PAGES = 10;

export default function Editor() {
  const canvasRef = useRef(null);
  const canvasInstanceRef = useRef(null);
  const [canvas, setCanvas] = useState(null);
  const [showDesignModal, setShowDesignModal] = useState(false);
  const [format, setFormat] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const pagesRef = useRef(Array(TOTAL_PAGES).fill(null));
  const currentPageRef = useRef(0);
  const isSwitchingRef = useRef(false);
  const [pageCount, setPageCount] = useState(TOTAL_PAGES);
  const canvasAreaRef = useRef(null);
  const [canvasScale, setCanvasScale] = useState(1);
  const CANVAS_H = 750;
  const CANVAS_W = format === 'A5' ? 1060 : 1050;
  const SPINE_LEFT  = Math.round(CANVAS_W / 2) - 10;
  const SPINE_RIGHT = Math.round(CANVAS_W / 2) + 10;

  const PHOTO_GAP = 18;
  const PHOTO_W = 185;
  const PHOTO_H = 240;
  const LARGE_W = 340;
  const LARGE_H = 500;

  // Center the 2×2 grid on the left half-page
  const LEFT_PAGE_W = SPINE_LEFT;
  const RIGHT_PAGE_W = CANVAS_W - SPINE_RIGHT;
  const GRID_W = 2 * PHOTO_W + PHOTO_GAP;
  const GRID_H = 2 * PHOTO_H + PHOTO_GAP;
  const LEFT_START_X = Math.round((LEFT_PAGE_W - GRID_W) / 2);
  const LEFT_START_Y = Math.round((CANVAS_H - GRID_H) / 2);

  // Center single large placeholder on each half-page
  const RIGHT_PLACEHOLDER_X = SPINE_RIGHT + Math.round((RIGHT_PAGE_W - LARGE_W) / 2);
  const LEFT_PLACEHOLDER_X  = Math.round((LEFT_PAGE_W - LARGE_W) / 2);
  const LARGE_PLACEHOLDER_Y = Math.round((CANVAS_H - LARGE_H) / 2);

  const placeholderPositions = [
    { left: LEFT_START_X,                       top: LEFT_START_Y,                       width: PHOTO_W, height: PHOTO_H },
    { left: LEFT_START_X + PHOTO_W + PHOTO_GAP, top: LEFT_START_Y,                       width: PHOTO_W, height: PHOTO_H },
    { left: LEFT_START_X,                       top: LEFT_START_Y + PHOTO_H + PHOTO_GAP, width: PHOTO_W, height: PHOTO_H },
    { left: LEFT_START_X + PHOTO_W + PHOTO_GAP, top: LEFT_START_Y + PHOTO_H + PHOTO_GAP, width: PHOTO_W, height: PHOTO_H },
    { left: RIGHT_PLACEHOLDER_X, top: LARGE_PLACEHOLDER_Y, width: LARGE_W, height: LARGE_H },
  ];

  const getPageLabel = (index) => {
    if (index === 0) return 'Korice';
    if (index === 1) return 'Stranica 1';
    if (index === pagesRef.current.length - 1) return 'Stranica 16';
    const start = (index - 1) * 2;
    const end = start + 1;
    return `Stranica ${start}-${end}`;
  };

  const getPageType = (index) => {
    if (index === 0) return 'cover';
    if (index === 1) return 'first';
    if (index === pagesRef.current.length - 1) return 'last';
    return 'blank';
  };

  const addSpineLines = (canvasInstance) => {
    const line1 = new Line([SPINE_LEFT, 0, SPINE_LEFT, CANVAS_H], {
      stroke: '#bbb', strokeWidth: 1, selectable: false, evented: false, name: 'spine',
    });
    const line2 = new Line([SPINE_RIGHT, 0, SPINE_RIGHT, CANVAS_H], {
      stroke: '#bbb', strokeWidth: 1, selectable: false, evented: false, name: 'spine',
    });
    canvasInstance.add(line1);
    canvasInstance.add(line2);
  };

  // Adds a "+" overlay linked to img via hintId so it moves with the placeholder
  const addPlaceholderOverlay = (canvasInstance, img) => {
    const cx = img.left + (img.width * img.scaleX) / 2;
    const cy = img.top + (img.height * img.scaleY) / 2;
    const circle = new Circle({
      left: cx - 20, top: cy - 20,
      radius: 20, fill: 'rgba(0,0,0,0.35)',
      selectable: false, evented: false,
      name: 'placeholder-hint', hintId: img.hintId,
    });
    const plus = new Text('+', {
      left: cx - 10, top: cy - 15,
      fontSize: 28, fill: 'white', fontFamily: 'Georgia',
      selectable: false, evented: false,
      name: 'placeholder-hint', hintId: img.hintId,
    });
    canvasInstance.add(circle);
    canvasInstance.add(plus);
  };

  const clearCanvas = (canvasInstance) => {
    canvasInstance.getObjects().slice().forEach(obj => canvasInstance.remove(obj));
    canvasInstance.backgroundColor = '#FAF8F4';
    canvasInstance.renderAll();
  };

  const initializePage = async (canvasInstance, pageIndex, savedJson = null) => {
    clearCanvas(canvasInstance);
    const type = getPageType(pageIndex);

    if (savedJson) {
      await canvasInstance.loadFromJSON(JSON.parse(savedJson));
      canvasInstance.getObjects().filter(o => o.name === 'spine').forEach(o => canvasInstance.remove(o));
      addSpineLines(canvasInstance);
      canvasInstance.renderAll();
      return;
    }

    addSpineLines(canvasInstance);

    if (type === 'cover') {
      const promises = placeholderPositions.map((pos) =>
        FabricImage.fromURL('/elementor-placeholder-image.png').then((img) => {
          img.set({
            left: pos.left, top: pos.top,
            selectable: true, name: 'placeholder',
            scaleX: pos.width / img.width,
            scaleY: pos.height / img.height,
            hintId: Math.random().toString(36).slice(2),
          });
          canvasInstance.add(img);
          addPlaceholderOverlay(canvasInstance, img);
        })
      );
      await Promise.all(promises);
    }

    if (type === 'first') {
      const darkLeft = new Rect({
        left: 0, top: 0,
        width: SPINE_LEFT * 2, height: CANVAS_H * 2,
        fill: '#2a2a2a',
        selectable: false, evented: false, name: 'locked',
      });
      canvasInstance.add(darkLeft);

      const rightPos = { left: RIGHT_PLACEHOLDER_X, top: LARGE_PLACEHOLDER_Y, width: LARGE_W, height: LARGE_H };
      const img = await FabricImage.fromURL('/elementor-placeholder-image.png');
      img.set({
        left: rightPos.left, top: rightPos.top,
        selectable: true, name: 'placeholder',
        scaleX: rightPos.width / img.width,
        scaleY: rightPos.height / img.height,
        hintId: Math.random().toString(36).slice(2),
      });
      canvasInstance.add(img);
      addPlaceholderOverlay(canvasInstance, img);
    }

    if (type === 'last') {
      const darkRight = new Rect({
        left: SPINE_RIGHT, top: 0,
        width: CANVAS_W, height: CANVAS_H * 2,
        fill: '#2a2a2a',
        selectable: false, evented: false, name: 'locked',
      });
      canvasInstance.add(darkRight);

      const leftPos = { left: LEFT_PLACEHOLDER_X, top: LARGE_PLACEHOLDER_Y, width: LARGE_W, height: LARGE_H };
      const img = await FabricImage.fromURL('/elementor-placeholder-image.png');
      img.set({
        left: leftPos.left, top: leftPos.top,
        selectable: true, name: 'placeholder',
        scaleX: leftPos.width / img.width,
        scaleY: leftPos.height / img.height,
        hintId: Math.random().toString(36).slice(2),
      });
      canvasInstance.add(img);
      addPlaceholderOverlay(canvasInstance, img);
    }

    canvasInstance.renderAll();
  };

  const switchPage = async (newIndex) => {
    if (isSwitchingRef.current || newIndex === currentPageRef.current) return;
    if (newIndex < 0 || newIndex >= pagesRef.current.length) return;
    isSwitchingRef.current = true;

    const json = JSON.stringify(canvasInstanceRef.current.toJSON(['name']));
    pagesRef.current[currentPageRef.current] = json;

    currentPageRef.current = newIndex;
    setCurrentPage(newIndex);

    const type = getPageType(newIndex);
    const savedJson = (type === 'blank') ? pagesRef.current[newIndex] : null;

    await initializePage(canvasInstanceRef.current, newIndex, savedJson);
    isSwitchingRef.current = false;
  };

  const addPage = () => {
    const updated = [...pagesRef.current];
    updated.splice(updated.length - 1, 0, null);
    pagesRef.current = updated;
    setPageCount(updated.length);
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    if (!files.length || !canvasInstanceRef.current) return;

    const placeholders = canvasInstanceRef.current.getObjects()
      .filter(obj => obj.name === 'placeholder')
      .sort((a, b) => {
        if (Math.abs(a.top - b.top) > 50) return a.top - b.top;
        return a.left - b.left;
      });

    // Remove hints for replaced placeholders
    files.forEach((file, index) => {
      if (index >= placeholders.length) return;
      const reader = new FileReader();
      reader.onload = (event) => {
        FabricImage.fromURL(event.target.result).then((img) => {
          const placeholder = placeholders[index];

          // Remove associated hint overlays by hintId
          canvasInstanceRef.current.getObjects()
            .filter(o => o.name === 'placeholder-hint' && o.hintId === placeholder.hintId)
            .forEach(o => canvasInstanceRef.current.remove(o));

          img.set({
            left: placeholder.left, top: placeholder.top,
            scaleX: placeholder.scaleX, scaleY: placeholder.scaleY,
            name: 'uploaded',
          });
          canvasInstanceRef.current.remove(placeholder);
          canvasInstanceRef.current.add(img);
          canvasInstanceRef.current.renderAll();
        });
      };
      reader.readAsDataURL(file);
    });

    e.target.value = '';
  };

  const placeDesign = (src) => {
    if (!canvasInstanceRef.current) return;

    const previousDesign = canvasInstanceRef.current.getObjects().find(obj => obj.name === 'design');
    if (previousDesign) canvasInstanceRef.current.remove(previousDesign);

    const rightPlaceholder = canvasInstanceRef.current.getObjects().find(
      obj => obj.name === 'placeholder' && obj.left > SPINE_RIGHT
    );

    FabricImage.fromURL(src).then((img) => {
      if (rightPlaceholder) {
        img.set({
          left: rightPlaceholder.left, top: rightPlaceholder.top,
          scaleX: rightPlaceholder.scaleX, scaleY: rightPlaceholder.scaleY,
          selectable: true, evented: true, name: 'design',
        });
        canvasInstanceRef.current.remove(rightPlaceholder);
      } else {
        img.set({ left: SPINE_RIGHT + 60, top: (CANVAS_H - 500) / 2, selectable: true, evented: true, name: 'design' });
        img.scaleToWidth(340);
      }
      canvasInstanceRef.current.add(img);
      canvasInstanceRef.current.renderAll();
    });
  };

  useEffect(() => {
    if (!format || !canvasAreaRef.current) return;
    const el = canvasAreaRef.current;
    const update = () => {
      const availW = el.clientWidth - 32;
      const availH = el.clientHeight - 32;
      const scaleW = availW / CANVAS_W;
      const scaleH = availH / CANVAS_H;
      setCanvasScale(Math.min(scaleW, scaleH, 1.5));
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, [format]);

  useEffect(() => {
    if (!format) return;

    const canvasInstance = new Canvas(canvasRef.current, {
      width: CANVAS_W,
      height: CANVAS_H,
      backgroundColor: '#FAF8F4',
    });

    canvasInstanceRef.current = canvasInstance;

    document.fonts.ready.then(async () => {
      await initializePage(canvasInstance, 0, null);

      canvasInstance.on('mouse:dblclick', (event) => {
        const clicked = event.target;
        if (clicked && clicked.name === 'placeholder') {
          const pageType = getPageType(currentPageRef.current);
          if (pageType === 'cover' && clicked.left > SPINE_RIGHT) {
            setShowDesignModal(true);
          } else {
            document.getElementById('imageUpload').click();
          }
        }
      });

      // Hover effect on placeholders
      canvasInstance.on('mouse:over', (event) => {
        const obj = event.target;
        if (obj && obj.name === 'placeholder') {
          obj.set('opacity', 0.75);
          canvasInstance.renderAll();
        }
      });
      canvasInstance.on('mouse:out', (event) => {
        const obj = event.target;
        if (obj && obj.name === 'placeholder') {
          obj.set('opacity', 1);
          canvasInstance.renderAll();
        }
      });

      canvasInstance.on('mouse:down', (event) => {
        const clicked = event.target;
        if (clicked && clicked.name === 'locked') {
          canvasInstance.discardActiveObject();
          canvasInstance.renderAll();
        }
      });

      const SNAP_THRESHOLD = 5;
      const leftCenterX  = CANVAS_W / 4;
      const rightCenterX = (CANVAS_W * 3) / 4;
      const centerY      = CANVAS_H / 2;
      const guides = { h: false, vLeft: false, vRight: false };

      canvasInstance.on('after:render', ({ ctx }) => {
        if (!guides.h && !guides.vLeft && !guides.vRight) return;
        ctx.save();
        ctx.strokeStyle = '#2196F3';
        ctx.lineWidth = 1;
        ctx.setLineDash([6, 4]);
        if (guides.h) { ctx.beginPath(); ctx.moveTo(0, centerY); ctx.lineTo(CANVAS_W, centerY); ctx.stroke(); }
        if (guides.vLeft) { ctx.beginPath(); ctx.moveTo(leftCenterX, 0); ctx.lineTo(leftCenterX, CANVAS_H); ctx.stroke(); }
        if (guides.vRight) { ctx.beginPath(); ctx.moveTo(rightCenterX, 0); ctx.lineTo(rightCenterX, CANVAS_H); ctx.stroke(); }
        ctx.restore();
      });

      canvasInstance.on('object:moving', (e) => {
        const obj = e.target;
        if (!obj) return;

        const pageType = getPageType(currentPageRef.current);
        if (pageType === 'first') {
          if (obj.left < SPINE_RIGHT + 5) { obj.left = SPINE_RIGHT + 5; obj.setCoords(); }
        }
        if (pageType === 'last') {
          const objWidth = obj.width * obj.scaleX;
          if (obj.left + objWidth > SPINE_LEFT - 5) { obj.left = SPINE_LEFT - objWidth - 5; obj.setCoords(); }
        }

        const center = obj.getCenterPoint();
        if (Math.abs(center.y - centerY) < SNAP_THRESHOLD) {
          obj.top += centerY - center.y; obj.setCoords(); guides.h = true;
        } else { guides.h = false; }
        if (center.x <= SPINE_LEFT && Math.abs(center.x - leftCenterX) < SNAP_THRESHOLD) {
          obj.left += leftCenterX - center.x; obj.setCoords(); guides.vLeft = true;
        } else { guides.vLeft = false; }
        if (center.x > SPINE_RIGHT && Math.abs(center.x - rightCenterX) < SNAP_THRESHOLD) {
          obj.left += rightCenterX - center.x; obj.setCoords(); guides.vRight = true;
        } else { guides.vRight = false; }

        // Keep "+" overlay centred on the placeholder while dragging
        if (obj.name === 'placeholder' && obj.hintId) {
          const cx = obj.left + (obj.width * obj.scaleX) / 2;
          const cy = obj.top + (obj.height * obj.scaleY) / 2;
          canvasInstance.getObjects()
            .filter(o => o.name === 'placeholder-hint' && o.hintId === obj.hintId)
            .forEach(o => {
              o.set(o.type === 'circle'
                ? { left: cx - 20, top: cy - 20 }
                : { left: cx - 10, top: cy - 15 });
              o.setCoords();
            });
        }
      });

      canvasInstance.on('mouse:up', () => {
        guides.h = false; guides.vLeft = false; guides.vRight = false;
        canvasInstance.renderAll();
      });

      setCanvas(canvasInstance);
    });

    return () => { canvasInstance.dispose(); };
  }, [format]);

  if (!format) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl p-8 w-full max-w-[520px] flex flex-col items-center gap-8 shadow-2xl">
          <div className="text-center">
            <h2 className="text-2xl font-semibold tracking-tight mb-1">Choose Paper Format</h2>
            <p className="text-gray-400 text-sm">Select the format for your photo album</p>
          </div>
          <div className="flex gap-6 w-full">
            {['A4', 'A5'].map((f) => (
              <button
                key={f}
                onClick={() => setFormat(f)}
                className="flex-1 flex flex-col items-center gap-4 border-2 border-gray-100 hover:border-gray-900 rounded-2xl p-6 transition-all group"
              >
                <div className={`border-2 border-gray-300 group-hover:border-gray-700 rounded flex items-center justify-center transition-all
                  ${f === 'A4' ? 'w-16 h-24' : 'w-12 h-16'}`}>
                  <span className="text-gray-400 text-xs font-medium">{f}</span>
                </div>
                <div className="text-center">
                  <p className="font-semibold text-sm">{f}</p>
                  <p className="text-xs text-gray-400">{f === 'A4' ? '210 × 297 mm' : '148 × 210 mm'}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-gray-50">
      <DesignHeader canvas={canvas} format={format} pagesRef={pagesRef} canvasInstanceRef={canvasInstanceRef} currentPage={currentPage} />

      <section className="flex flex-row flex-1 overflow-hidden">
        <div className="flex flex-row flex-1 overflow-hidden">
          <AddObject canvas={canvas} placeDesign={placeDesign} showDesignModal={showDesignModal} setShowDesignModal={setShowDesignModal} currentPage={currentPage} totalPages={pagesRef.current.length} />

          <div className="flex-1 flex flex-col overflow-hidden">
            <div ref={canvasAreaRef} className="flex-1 flex items-center justify-center bg-gray-100 overflow-hidden">
              <input type="file" accept="image/*" id="imageUpload" multiple style={{ display: 'none' }} onChange={handleImageUpload} />
              <div style={{ width: CANVAS_W * canvasScale, height: CANVAS_H * canvasScale, flexShrink: 0, position: 'relative' }}>
                <div style={{ transformOrigin: 'top left', transform: `scale(${canvasScale})`, position: 'absolute', top: 0, left: 0 }}>
                  {currentPage === 0 && <TextBlock canvas={canvas} />}
                  <canvas ref={canvasRef} style={{ display: 'block', boxShadow: '0 8px 48px 0 rgba(0,0,0,0.22)' }} />
                </div>
              </div>
            </div>

            {/* Bottom nav */}
            <div className="bg-white border-t border-gray-100 px-4 py-3 flex flex-col gap-3">
              <div className="flex items-center justify-center gap-3">
                <button
                  onClick={() => switchPage(currentPage - 1)}
                  disabled={currentPage === 0}
                  className="flex items-center gap-1.5 bg-gray-900 text-white text-xs px-4 py-2 rounded-lg disabled:opacity-30 hover:bg-gray-700 transition-colors"
                >
                  ‹ <span className="hidden sm:inline">Prošla stranica</span>
                </button>
                <button
                  onClick={addPage}
                  className="border border-gray-200 text-xs px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <span className="hidden sm:inline">Dodaj Stranicu</span>
                  <span className="sm:hidden">+</span>
                </button>
                <button
                  onClick={() => switchPage(currentPage + 1)}
                  disabled={currentPage === pagesRef.current.length - 1}
                  className="flex items-center gap-1.5 bg-gray-900 text-white text-xs px-4 py-2 rounded-lg disabled:opacity-30 hover:bg-gray-700 transition-colors"
                >
                  <span className="hidden sm:inline">Sledeća stranica</span> ›
                </button>
              </div>

              {/* Page thumbnails */}
              <div className="flex gap-2 overflow-x-auto pb-1 px-1">
                {pagesRef.current.map((_, index) => (
                  <div
                    key={index}
                    onClick={() => switchPage(index)}
                    className="flex flex-col items-center gap-1 cursor-pointer flex-shrink-0 group"
                  >
                    <div className={`w-16 sm:w-24 h-12 sm:h-16 rounded-lg border-2 flex items-center justify-center overflow-hidden transition-all
                      ${currentPage === index ? 'border-gray-900 shadow-sm' : 'border-gray-200 hover:border-gray-400'}
                      ${getPageType(index) === 'first'  ? 'bg-gradient-to-r from-gray-700 to-white' : ''}
                      ${getPageType(index) === 'last'   ? 'bg-gradient-to-r from-white to-gray-700' : ''}
                      ${getPageType(index) === 'cover'  ? 'bg-gray-50' : ''}
                      ${getPageType(index) === 'blank'  ? 'bg-white' : ''}
                    `}>
                      <div className="w-px h-full bg-gray-300" />
                    </div>
                    <span className="text-[10px] text-gray-400 whitespace-nowrap group-hover:text-gray-600 transition-colors">
                      {getPageLabel(index)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <Settings canvas={canvas} />
      </section>
    </div>
  );
}