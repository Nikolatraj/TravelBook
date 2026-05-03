'use client';
import { useEffect } from 'react';
import { Textbox } from 'fabric';

export default function TextBlock({ canvas }) {
    useEffect(() => {
        if (!canvas) return;

        const textBlocks = [
            { content: 'London',  left: 263,  top: 707, width: 384, fontSize: 32, textAlign: 'center',angle: 0 },
            { content: 'London',  left: 788, top: 48,  width: 384, fontSize: 52, textAlign: 'center',angle: 0 },
            { content: '2025',    left: 921, top: 111,  width: 160, fontSize: 32, textAlign: 'right',angle: 0  },
            { content: 'January', left: 788, top: 707, width: 384, fontSize: 32, textAlign: 'center',angle: 0 },
            { content: 'Dodajte Tekst', left: 526, top: 375, width: 212, fontSize: 14, textAlign: 'center',angle: -90 },
        ];

        textBlocks.forEach(({ content, left, top, width, fontSize, textAlign, angle }) => {
            const text = new Textbox(content, {
                fontSize: fontSize,
                fontFamily: 'Plus Jakarta Sans',
                left: left,
                top: top,
                width: width,
                textAlign: textAlign,
                padding: 15,
                angle: angle,
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
        });

        canvas.renderAll();
    }, [canvas]);

    return null;
}