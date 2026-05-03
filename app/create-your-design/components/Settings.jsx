'use client';
import { useEffect, useState } from 'react';

export default function Settings({ canvas }) {
    const [selectedObject, setSelectedObject] = useState(null);
    const [position, setPosition] = useState({ top: 0, left: 0 });
    const [width, setWidth] = useState("");
    const [height, setHeight] = useState("");
    const [color, setColor] = useState("");
    const [fontSize, setFontSize] = useState("");
    const [fontFamily, setFontFamily] = useState("");
    const [bold, setBold] = useState(false);
    const [italic, setItalic] = useState(false);
    const [underline, setUnderline] = useState(false);
    const [textAlign, setTextAlign] = useState("left");
    const [letterSpacing, setLetterSpacing] = useState(0);
    const [textBg, setTextBg] = useState("");
    const [textWidth, setTextWidth] = useState("");
    const [textLeft, setTextLeft] = useState("");
    const [textTop, setTextTop] = useState("");


    const updatePosition = (object) => {
        if (!object || !canvas) return;
        const bound = object.getBoundingRect();
        const canvasEl = canvas.getElement();
        const canvasRect = canvasEl.parentElement.getBoundingClientRect();

        setPosition({
            top: canvasRect.top + bound.top + bound.height + 10,
            left: canvasRect.left + bound.left,
        });
    };

    useEffect(() => {
        if (!canvas) return;

        canvas.on("selection:created", (event) => {
            handleObjectSelection(event.selected[0]);
            updatePosition(event.selected[0]);
        });

        canvas.on("selection:updated", (event) => {
            handleObjectSelection(event.selected[0]);
            updatePosition(event.selected[0]);
        });

        canvas.on("selection:cleared", () => {
            setSelectedObject(null);
            clearSettings();
        });

        canvas.on("object:modified", (event) => {
            handleObjectSelection(event.target);
            updatePosition(event.target);
        });

        canvas.on("object:moving", (event) => {
            updatePosition(event.target);
            setTextLeft(Math.round(event.target.left));
            setTextTop(Math.round(event.target.top));
        });

        canvas.on("object:scaling", (event) => {
            handleObjectSelection(event.target);
            updatePosition(event.target);
        });

    }, [canvas]);

    const handleObjectSelection = (object) => {
        if (!object) return;
        setSelectedObject(object);
        if (object.type === "rect") {
            setWidth(Math.round(object.width * object.scaleX));
            setHeight(Math.round(object.height * object.scaleY));
            setColor(object.fill);
        } 
        else if (object.type === "textbox") {
            setFontSize(object.fontSize);
            setColor(object.fill);
            setFontFamily(object.fontFamily);
            setBold(object.fontWeight === "bold");
            setItalic(object.fontStyle === "italic");
            setUnderline(object.underline);
            setTextAlign(object.textAlign);
            setLetterSpacing(object.charSpacing);
            setTextBg(object.textBackgroundColor || "");
            setTextWidth(Math.round(object.width));
            setTextLeft(Math.round(object.left));
            setTextTop(Math.round(object.top));
        }
    };

    const clearSettings = () => {
        setWidth("");
        setHeight("");
        setColor("");
        setFontSize("");
        setFontFamily("");
        setBold(false);
        setItalic(false);
        setUnderline(false);
        setTextAlign("left");
        setLetterSpacing(0);
        setTextBg("");
        setTextWidth("");
        setTextLeft("");
        setTextTop("");
    };

    const deleteObject = () => {
        if (selectedObject) {
            canvas.remove(selectedObject);
            canvas.renderAll();
            setSelectedObject(null);
        }
    };

    const handleWidthChange = (e) => {
        const value = parseInt(e.target.value);
        setWidth(value);
        if (selectedObject) {
            selectedObject.set({ scaleX: value / selectedObject.width });
            canvas.renderAll();
        }
    };

    const handleHeightChange = (e) => {
        const value = parseInt(e.target.value);
        setHeight(value);
        if (selectedObject) {
            selectedObject.set({ scaleY: value / selectedObject.height });
            canvas.renderAll();
        }
    };

    const handleColorChange = (e) => {
        const value = e.target.value;
        setColor(value);
        if (selectedObject) {
            selectedObject.set({ fill: value });
            canvas.renderAll();
        }
    };

    const handleFontSizeChange = (e) => {
        const value = parseInt(e.target.value);
        setFontSize(value);
        if (selectedObject) {
            selectedObject.set({ fontSize: value });
            canvas.renderAll();
        }
    };

    const handleFontFamilyChange = (e) => {
        const value = e.target.value; 
        setFontFamily(value);
        if (selectedObject) {
            selectedObject.set({ fontFamily: value }); 
            canvas.renderAll();
        }
    };

    const handleBoldChange = () => {
        const value = bold ? "normal" : "bold";
        setBold(!bold);
        if (selectedObject) {
            selectedObject.set({ fontWeight: value });
            canvas.renderAll();
        }
    };

    const handleItalicChange = () => {
        const value = italic ? "normal" : "italic";
        setItalic(!italic);
        if (selectedObject) {
            selectedObject.set({ fontStyle: value });
            canvas.renderAll();
        }
    };

    const handleUnderlineChange = () => {
        setUnderline(!underline);
        if (selectedObject) {
            selectedObject.set({ underline: !underline });
            canvas.renderAll();
        }
    };

    const handleTextAlignChange = (align) => {
        setTextAlign(align);
        if (selectedObject) {
            selectedObject.set({ 
                textAlign: align,
                left: selectedObject.left,
            });
            canvas.renderAll();
        }
    };

    const handleLetterSpacingChange = (e) => {
        const value = parseInt(e.target.value);
        setLetterSpacing(value);
        if (selectedObject) {
            selectedObject.set({ charSpacing: value });
            canvas.renderAll();
        }
    };

    const handleTextBgChange = (e) => {
        const value = e.target.value;
        setTextBg(value);
        if (selectedObject) {
            selectedObject.set({ textBackgroundColor: value });
            canvas.renderAll();
        }
    };

    const handleTextWidthChange = (e) => {
        const value = parseInt(e.target.value);
        setTextWidth(value);
        if (selectedObject) {
            selectedObject.set({ width: value });
            canvas.renderAll();
        }
    };

    const handleTextLeftChange = (e) => {
        const value = parseInt(e.target.value);
        setTextLeft(value);
        if (selectedObject) {
            selectedObject.set({ left: value });
            canvas.renderAll();
        }
    };

    const handleTextTopChange = (e) => {
        const value = parseInt(e.target.value);
        setTextTop(value);
        if (selectedObject) {
            selectedObject.set({ top: value });
            canvas.renderAll();
        }
    };

    if (!selectedObject) return null;

    return (
        <div
            className="fixed z-50 bg-white border border-gray-200 rounded-lg shadow-lg p-3 flex flex-row items-center gap-3"
            style={{ top: position.top, left: position.left }}
        >
            <div className="flex items-center gap-1">
                <label className="text-xs text-gray-500">Color</label>
                <input type="color" value={color} onChange={handleColorChange} className="w-8 h-8 cursor-pointer" />
            </div>
             {/* width, x, y */}
                    <div className="flex items-center gap-1">
                        <label className="text-xs text-gray-500">W</label>
                        <input type="number" value={textWidth} onChange={handleTextWidthChange} className="w-16 border rounded px-1 text-sm" />
                    </div>
                    <div className="flex items-center gap-1">
                        <label className="text-xs text-gray-500">X</label>
                        <input type="number" value={textLeft} onChange={handleTextLeftChange} className="w-16 border rounded px-1 text-sm" />
                    </div>
                    <div className="flex items-center gap-1">
                        <label className="text-xs text-gray-500">Y</label>
                        <input type="number" value={textTop} onChange={handleTextTopChange} className="w-16 border rounded px-1 text-sm" />
                    </div>

            {selectedObject.type === "rect" && (
                <>
                    <div className="flex items-center gap-1">
                        <label className="text-xs text-gray-500">W</label>
                        <input type="number" value={width} onChange={handleWidthChange} className="w-16 border rounded px-1 text-sm" />
                    </div>
                    <div className="flex items-center gap-1">
                        <label className="text-xs text-gray-500">H</label>
                        <input type="number" value={height} onChange={handleHeightChange} className="w-16 border rounded px-1 text-sm" />
                    </div>
                </>
            )}

            {selectedObject.type === "textbox" && (
                <div className="flex items-center gap-2 flex-wrap">
                    
                    {/* font size */}
                    <div className="flex items-center gap-1">
                        <label className="text-xs text-gray-500">Size</label>
                        <input type="number" value={fontSize} onChange={handleFontSizeChange} className="w-14 border rounded px-1 text-sm" />
                    </div>

                    {/* font family */}
                    <select value={fontFamily} onChange={handleFontFamilyChange} className="border rounded px-1 text-sm">
                        <option value="Plus Jakarta Sans">Plus Jakarta Sans</option>
                        <option value="Bebas Neue">Bebas Neue</option>
                        <option value="Arial">Arial</option>
                        <option value="Times New Roman">Times New Roman</option>
                    </select>

                    {/* bold italic underline */}
                    <button onClick={handleBoldChange} className={`px-2 py-1 text-sm font-bold rounded border ${bold ? 'bg-black text-white' : 'bg-white text-black'}`}>B</button>
                    <button onClick={handleItalicChange} className={`px-2 py-1 text-sm italic rounded border ${italic ? 'bg-black text-white' : 'bg-white text-black'}`}>I</button>
                    <button onClick={handleUnderlineChange} className={`px-2 py-1 text-sm underline rounded border ${underline ? 'bg-black text-white' : 'bg-white text-black'}`}>U</button>

                    {/* text align */}
                    <button onClick={() => handleTextAlignChange("left")} className={`px-2 py-1 text-sm rounded border ${textAlign === 'left' ? 'bg-black text-white' : 'bg-white text-black'}`}>L</button>
                    <button onClick={() => handleTextAlignChange("center")} className={`px-2 py-1 text-sm rounded border ${textAlign === 'center' ? 'bg-black text-white' : 'bg-white text-black'}`}>C</button>
                    <button onClick={() => handleTextAlignChange("right")} className={`px-2 py-1 text-sm rounded border ${textAlign === 'right' ? 'bg-black text-white' : 'bg-white text-black'}`}>R</button>

                    {/* letter spacing */}
                    <div className="flex items-center gap-1">
                        <label className="text-xs text-gray-500">Spacing</label>
                        <input type="number" value={letterSpacing} onChange={handleLetterSpacingChange} className="w-14 border rounded px-1 text-sm" />
                    </div>

                    {/* text color */}
                    <div className="flex items-center gap-1">
                        <label className="text-xs text-gray-500">Text</label>
                        <input type="color" value={color} onChange={handleColorChange} className="w-8 h-8 cursor-pointer" />
                    </div>

                    {/* text background color */}
                    <div className="flex items-center gap-1">
                        <label className="text-xs text-gray-500">BG</label>
                        <input type="color" value={textBg || "#ffffff"} onChange={handleTextBgChange} className="w-8 h-8 cursor-pointer" />
                    </div>

                    

                </div>
            )}
            <button onClick={deleteObject} className="bg-red-500 text-white text-xs px-2 py-1 rounded">
                Delete
            </button>
        </div>
    );
}