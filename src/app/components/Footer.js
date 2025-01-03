"use client";

import Image from "next/image";
import logoImage from "@/public/ThalesLogo.png";

const Footer = () => {
    return (
        <div className="bg-white rounded-lg shadow dark:bg-gray-900 m-4">
            <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
                <div className="flex flex-col items-center mb-6">
                    <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 dark:text-gray-400">
                        <li>
                            <a href="#" className="hover:underline me-4 md:me-6">About</a>
                        </li>
                        <li>
                            <a href="#" className="hover:underline me-4 md:me-6">Privacy Policy</a>
                        </li>
                        <li>
                            <a href="#" className="hover:underline me-4 md:me-6">Licensing</a>
                        </li>
                        <li>
                            <a href="#" className="hover:underline">Contact</a>
                        </li>
                    </ul>

                    {/* Logo centrado */}
                    <Image
                        src={logoImage}
                        alt="Thales Logo"
                        width={300}
                        height={100}
                        className='mb-8'
                    />
                </div>

                <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
                <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">
                    © 2024 
                    <a href="https://soporte-t-cnico-y-soluciones-tecnol-gicas-pmoi-p74sv64fd.vercel.app/" className="hover:underline">SupOrd™</a>. Diseñado por Rodrigo Iván Ordoñez Chávez.
                </span>
            </div>
        </div>
    );
};

export default Footer;







