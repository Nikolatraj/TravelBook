'use client';
import { useEffect, useRef, useState } from 'react';
import { Canvas, Line, FabricImage } from 'fabric';
import Settings from './components/Settings';
import AddObject from './components/AddObject';
import DesignHeader from './components/DesignHeader';
import TextBlock from './components/TextBlock';

export default function Editor() {
  const canvasRef = useRef(null);
  const [canvas, setCanvas] = useState(null);
  const placeholderPositions = [
    { left: 180, top: 150, width: 160, height: 210 },
    { left: 360, top: 150, width: 160, height: 210 },
    { left: 180, top: 380, width: 160, height: 210 },
    { left: 360, top: 380, width: 160, height: 210 },
    { left: 800, top: 430, width: 300, height: 450 },
  ];

 const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    if (!files.length || !canvas) return;

    const placeholders = canvas.getObjects()
        .filter(obj => obj.name === 'placeholder')
        .sort((a, b) => {
            if (Math.abs(a.top - b.top) > 50) return a.top - b.top;
            return a.left - b.left;
        });

    files.forEach((file, index) => {
        if (index >= placeholders.length) return;

        const reader = new FileReader();
        reader.onload = (event) => {
            FabricImage.fromURL(event.target.result).then((img) => {
                const placeholder = placeholders[index];
                img.set({
                    left: placeholder.left,
                    top: placeholder.top,
                    scaleX: placeholder.scaleX,
                    scaleY: placeholder.scaleY,
                });
                canvas.remove(placeholder);
                canvas.add(img);
                canvas.renderAll();
            });
        };
        reader.readAsDataURL(file);
    });

    e.target.value = '';
};

  useEffect(() => {
    const baseURL = window.location.origin;
    const canvasInstance = new Canvas(canvasRef.current, {
      width: 1050,
      height: 750,
      backgroundColor: 'white',
    });

    document.fonts.ready.then(() => {
      const line = new Line([525, 0, 525, 750], {
        stroke: 'black',
        strokeWidth: 2,
        selectable: false,
        evented: false,
      });
      canvasInstance.add(line);

      placeholderPositions.forEach((pos) => {
        FabricImage.fromURL(`${baseURL}/elementor-placeholder-image.png`).then((img) => {
          img.set({
            left: pos.left,
            top: pos.top,
            selectable: true,
            name: 'placeholder',
            scaleX: pos.width / img.width,
            scaleY: pos.height / img.height,
          });
          canvasInstance.add(img);
          canvasInstance.renderAll();
        });
      });

      canvasInstance.on('mouse:dblclick', (event) => {
        const clicked = event.target;
        if (clicked && clicked.name === 'placeholder') {
          document.getElementById('imageUpload').click();
        }
      });

      setCanvas(canvasInstance);
    });

    return () => {
      canvasInstance.dispose();
    };
  }, []);

  return (
    <div>
      <DesignHeader />
      <section className="flex flex-row h-screen">

        <div className="flex flex-row flex-1 h-full">
          <AddObject canvas={canvas} />

          <div className="flex-1 h-full flex items-center justify-center bg-gray-100">
            <input
              type="file"
              accept="image/*"
              id="imageUpload"
              multiple
              style={{ display: 'none' }}
              onChange={handleImageUpload}
              />
              <TextBlock canvas={canvas} x={260} y={550} fontSize={50} width={350} />
              <TextBlock canvas={canvas} x={260} y={680} fontSize={50} width={350} />
              <TextBlock canvas={canvas} x={800} y={70} fontSize={50} width={250} />
              <TextBlock canvas={canvas} x={800} y={170} fontSize={30} width={200} />
              <TextBlock canvas={canvas} x={800} y={700} fontSize={40} width={220} />
            <canvas ref={canvasRef} style={{ border: '1px solid black' }} />
   
          </div>
        </div>

        <div>
          <Settings canvas={canvas} />
        </div>

      </section>
    </div>
  );
}