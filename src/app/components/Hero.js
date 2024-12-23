// components/Hero.js
"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import heroImage from "@/public/hero.jpg";
import logoImage from "@/public/ThalesLogo.png";


const Hero = () => {
    const router = useRouter();

    return (
        <div className="relative hero h-screen">
            <Image
                src={heroImage}
                alt="Hero Image"
                fill 
                className='object-cover opacity-70'
            />
            <div className="absolute inset-0 bg-blue-800 bg-opacity-50 flex flex-col items-center justify-center text-center">
            <Image
                src={logoImage}
                alt="Thales Logo"
                width={300}
                height={100}
                className='mb-8'
            />
              <h1 className='text-6xl text-lg font-bold text-white'>Welcome to <span className='text-blue-600 text-6xl'>TI</span>  Inventory</h1>
                <p className='mt-4 mb-4 text-lg text-white'>Your day is made easier here.</p>
                <Link href='/login'>
                    {/* Elimina el enlace <a> ya que Link ahora envuelve automáticamente */}
                    <span className='mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-500 transition duration-300'>
                        Get Started
                    </span>
                </Link>
            </div>
        </div>
    );
};

export default Hero;
