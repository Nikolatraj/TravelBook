'use client';
import Image from 'next/image';
import React from 'react'

const DesignHeader = () => {
  return (
    <section className='flex flex-row h-30 max-h-30 '> 
        <div className='flex w-1/3  justify-center items-center'>
            <h1 className='text-2xl'>ASD</h1>
        </div>

        <div className='flex w-1/3  justify-center items-center'>
            <Image 
            src="/logo.png"
            width="300"
            height="70"
            alt="Logo Slika" 
            />
        </div>
        
        <div className='flex w-1/3  justify-center items-center'>
            <h1>ASD</h1>
        </div>
    </section>
  )
}

export default DesignHeader