//src/app/showPeripheral/page.js

"use client";

import { useEffect, useState } from "react";
import supabase from "@/utils/supabaseClient";
import Image from "next/image";
import logoImage from "@/public/ThalesLogo.png";
import Link from "next/link"; // Asegúrate de importar Link
import { useRouter } from "next/navigation"; // Importar useRouter

const ShowPeripheral = () => {
  const [peripherals, setPeripherals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);  
  const router = useRouter();

  //Function to get the data from the table

  const fetchPeripherals = async () => {
    setLoading(true);
    const { data, error } = await supabase.from("peripherals").select("*");
    if (error) {
      setError(error.message);
    } else {
      setPeripherals(data);
    }
    setLoading(false);
  };

  // Function to delete a record

  const handleDelete = async (id) => {
    const { error } = await supabase.from("peripherals").delete().eq("id", id);
    if (error) {
      console.error("Error al eliminar:", error.message);
    } else {
      fetchPeripherals();
    }
  };

  // Effect to load data when mounting the component

  useEffect(() => {
    fetchPeripherals();
  }, []);

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      {/*  Logo Sección */}
      <div className="flex justify-center mb-8">
        <Image src={logoImage} alt="Thales Logo" width={150} height={50} />
      </div>
      <h1 className="text-4xl font-bold mb-8">List of Peripherals</h1>
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr>
            <th className="border px-4 py-2">Id</th>
            <th className="border px-4 py-2">Peripheral Type</th>
            <th className="border px-4 py-2">Brand</th>
            <th className="border px-4 py-2">Model</th>
            <th className="border px-4 py-2">Serial</th>
            <th className="border px-4 py-2">Ubication</th>
            <th className="border px-4 py-2">Physical Condition</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {peripherals.map((peripheral) => (
            <tr key={peripheral.id}>
              <td className="border px-4 py-2">{peripheral.id}</td>
              <td className="border px-4 py-2">{peripheral.peripheralType}</td>
              <td className="border px-4 py-2">{peripheral.brand}</td>
              <td className="border px-4 py-2">{peripheral.model}</td>
              <td className="border px-4 py-2">{peripheral.serial}</td>
              <td className="border px-4 py-2">{peripheral.ubication}</td>
              <td className="border px-4 py-2">{peripheral.physicalCondition}
              </td>
              <td className="border px-4 py-2">
                {/** Delete button */}
                <button
                  onClick={() => handleDelete(peripheral.id)}
                  className="bg-red-500 text-white px-4 py-1 rounded"
                >
                  Delete
                </button>
                {/** Button to edit or modify */}
                <button
                  onClick={() => {
                    console.log("Edit peripheral:", peripheral);                    
                  }}
                  className="bg-yellow-500 text-white px-4 py-1 rounded mt-2"
                >
                  Update
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/** Show edit modal if active */}

      {/** Logout link */}
      <div className="flex">
        <Link
          href="/dashboard"
          className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded mt-6"
        >
          Go Dashboard
        </Link>
        <Link
          onClick={(e) => {
            e.preventDefault();
            supabase.auth.signOut();
            router.push("/");
          }}
          href="#"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-500 hover:border-transparent rounded mt-6 ml-4"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
};

export default ShowPeripheral;
