'use client';
import Image from 'next/image';
import React from 'react';
import jsPDF from 'jspdf';

const DesignHeader = ({ canvas, format, pagesRef, canvasInstanceRef, currentPage, undo, redo }) => {

  const exportPDF = async () => {
    if (!canvas || !canvasInstanceRef.current) return;

    const canvasInstance = canvasInstanceRef.current;

    // save current page before exporting
    const currentJson = JSON.stringify(canvasInstance.toJSON(['name']));
    pagesRef.current[currentPage] = currentJson;

    // check all pages have been visited
    const unvisited = pagesRef.current.filter(p => p === null).length;
    if (unvisited > 0) {
      alert(`You have ${unvisited} unvisited pages. Please review all pages before exporting.`);
      return;
    }

    const pdfWidth  = format === 'A5' ? 210 : 297;
    const pdfHeight = format === 'A5' ? 148 : 210;

    const pdf = new jsPDF({
      orientation: 'landscape',
      unit: 'mm',
      format: format === 'A5' ? 'a5' : 'a4',
    });

    const pages = pagesRef.current;

    for (let i = 0; i < pages.length; i++) {
      await canvasInstance.loadFromJSON(JSON.parse(pages[i]));
      await new Promise(resolve => {
        canvasInstance.requestRenderAll();
        setTimeout(resolve, 100);
      });

      const imgData = canvasInstance.toDataURL({ format: 'png', multiplier: 1 });
      const imgWidth  = pdfWidth;
      const imgHeight = (canvasInstance.height * pdfWidth) / canvasInstance.width;
      const y = (pdfHeight - imgHeight) / 2;

      if (i > 0) pdf.addPage();
      pdf.addImage(imgData, 'PNG', 0, y, imgWidth, imgHeight);
    }

    // restore current page on canvas after export
    await canvasInstance.loadFromJSON(JSON.parse(pagesRef.current[currentPage]));
    canvasInstance.renderAll();

    pdf.save(`album-${format}.pdf`);
  };

  return (
    <section className='flex flex-row h-14 sm:h-20 items-center border-b border-gray-200'>
      <div className='flex w-1/3 justify-center items-center gap-1 sm:gap-2'>
        <button
          onClick={undo}
          className="bg-gray-100 hover:bg-gray-200 text-black text-xs sm:text-sm px-2 sm:px-3 py-1.5 sm:py-2 rounded transition-colors"
        >
          ↩ <span className="hidden sm:inline">Undo</span>
        </button>
        <button
          onClick={redo}
          className="bg-gray-100 hover:bg-gray-200 text-black text-xs sm:text-sm px-2 sm:px-3 py-1.5 sm:py-2 rounded transition-colors"
        >
          <span className="hidden sm:inline">Redo </span>↪
        </button>
      </div>

      <div className='flex w-1/3 justify-center items-center'>
        <Image
          src="/logo.png"
          width="300"
          height="70"
          alt="Logo Slika"
          className="h-7 sm:h-10 w-auto"
        />
      </div>

      <div className='flex w-1/3 justify-center items-center'>
        <button
          onClick={exportPDF}
          className="bg-black text-white text-xs sm:text-sm px-3 sm:px-4 py-1.5 sm:py-2 rounded hover:bg-gray-800 transition-colors"
        >
          <span className="hidden sm:inline">Export </span>PDF
        </button>
      </div>
    </section>
  );
};

export default DesignHeader;