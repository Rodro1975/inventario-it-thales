// pages/dashboard.js
"use client";

import Image from "next/image";
import logoImage from "@/public/ThalesLogo.png";
import Link from "next/link";
import supabase from "@/utils/supabaseClient"; 
import Footer from "../components/Footer";

const DashboardPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      {/* Sección del Logo */}
      <div className="flex justify-center mb-8">
        <Image
          src={logoImage}
          alt="Thales Logo"
          width={150} // Ajusta el tamaño según sea necesario
          height={50} // Ajusta el tamaño según sea necesario
        />
      </div>
      <h1 className="text-4xl font-bold mb-8 text-center">Dashboard</h1>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-2">
        <Link href="/addUser">
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer">
            <h2 className="text-xl font-semibold mb-2">Add User</h2>
            <p className="text-gray-600">Click here to add a new user.</p>
          </div>
        </Link>
        <Link href="/addComputer">
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer">
            <h2 className="text-xl font-semibold mb-2">Add a Computer</h2>
            <p className="text-gray-600">
              Click here to enter computer equipment into inventory.
            </p>
          </div>
        </Link>
        <Link href="/addPeripheral">
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer">
            <h2 className="text-xl font-semibold mb-2">Add a Peripheral</h2>
            <p className="text-gray-600">
              Click here to enter computer peripherals into inventory.
            </p>
          </div>
        </Link>
        <div className="flex flex-wrap -mb-4">
          <Link
            onClick={() => supabase.auth.signOut()}
            href="/showComputers"
            className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
          >
            Show Computers
          </Link>
          <Link
            onClick={() => supabase.auth.signOut()}
            href="#"
            className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
          >
            Show Peripherals
          </Link>
          <Link
            onClick={() => supabase.auth.signOut()}
            href="#"
            className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
          >
            Show Users
          </Link>
        </div>

        <Link onClick={() => supabase.auth.signOut()} href="/">
          <div className="bg-blue-500 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer">
            <h2 className="text-white text-xl font-semibold mb-2">Go Home</h2>
          </div>
        </Link>
      </div>
      <Footer/>
    </div>
    
  );
};

export default DashboardPage;
