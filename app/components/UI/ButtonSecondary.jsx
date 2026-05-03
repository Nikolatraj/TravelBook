'use client';
import React from 'react';
import Link from 'next/link';

const ButtonSecondary = ({ text, link,variant = 'black' }) => {
  const styles = {
    white: 'bg-white text-black border border-white hover:bg-black hover:text-white',
    black: 'bg-black text-white border border-black hover:bg-white hover:text-black',
  };
  return (
    <Link href={link}>
      <button className={`${styles[variant]} rounded-md text-[24] px-10 py-3 transition-colors duration-200`}>
        {text} →
      </button>
    </Link>
  );
};

export default ButtonSecondary;