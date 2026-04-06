'use client';
import { useEffect } from 'react';
import { Textbox } from 'fabric';

export default function TextBlock({ canvas, x, y, fontSize, width }) {
    useEffect(() => {
        if (!canvas) return;

        const text = new Textbox('Click to edit', {
            fontSize: fontSize,
            fontFamily: 'Plus Jakarta Sans',
            left: x,
            top: y,
            width: width || 300,
            textAlign: 'left',
            padding: 15,
            selectable: true,
            evented: true,
            stroke: 'black',
            strokeWidth: 0,
            borderColor: 'black',
            borderDashArray: [4, 4],
            borderScaleFactor: 2,
            backgroundColor: 'transparent',
            box: true,
        });

        canvas.add(text);
        canvas.renderAll();

    }, [canvas]);

    return null;
}