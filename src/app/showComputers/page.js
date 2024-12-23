"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/utils/supabaseClient";
import Image from "next/image";
import logoImage from "@/public/ThalesLogo.png";
import Link from "next/link"; // Asegúrate de importar Link
import { useRouter } from "next/navigation"; // Importar useRouter
import UpdateComputer from "../components/UpdateComputer";

const ShowComputers = () => {
  const [computers, setComputers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false); //Estado para controlar si estamos editando
  const [currentComputer, setCurrentComputer] = useState(null); //Estado para almacenar el equipo actual al editar
  const router = useRouter(); // Inicializa el router

  // Función para obtener los datos de la tabla
  const fetchComputers = async () => {
    setLoading(true);
    const { data, error } = await supabase.from("computers").select("*");

    if (error) {
      setError(error.message);
    } else {
      setComputers(data);
    }
    setLoading(false);
  };

  // Función para eliminar un registro
  const handleDelete = async (id) => {
    const { error } = await supabase.from("computers").delete().eq("id", id); // Asegúrate de que 'id' sea el nombre correcto del campo

    if (error) {
      console.error("Error al eliminar:", error.message);
    } else {
      fetchComputers(); // Refrescar la lista después de eliminar
    }
  };

  // Efecto para cargar los datos al montar el componente
  useEffect(() => {
    fetchComputers();
  }, []);

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      {/* Sección del Logo */}
      <div className="flex justify-center mb-8">
        <Image src={logoImage} alt="Thales Logo" width={150} height={50} />
      </div>
      <h1 className="text-4xl font-bold mb-8">Lista de Equipos</h1>
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr>
            <th className="border px-4 py-2">Id</th>
            <th className="border px-4 py-2">Nombre</th>
            <th className="border px-4 py-2">Marca</th>
            <th className="border px-4 py-2">Modelo</th>
            <th className="border px-4 py-2">Service Tag</th>
            <th className="border px-4 py-2">Ubicación</th>
            <th className="border px-4 py-2">Especificaciones Técnicas</th>
            <th className="border px-4 py-2">Periféricos</th>
            <th className="border px-4 py-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {computers.map((computer) => (
            <tr key={computer.id}>
              <td className="border px-4 py-2">{computer.id}</td>
              <td className="border px-4 py-2">{computer.name}</td>
              <td className="border px-4 py-2">{computer.brand}</td>
              <td className="border px-4 py-2">{computer.model}</td>
              <td className="border px-4 py-2">{computer.serviceTag}</td>
              <td className="border px-4 py-2">{computer.ubication}</td>
              <td className="border px-4 py-2">{computer.technicalSpecific}</td>
              <td className="border px-4 py-2">{computer.peripherals}</td>
              <td className="border px-4 py-2">
                {/* Botón para eliminar */}
                <button
                  onClick={() => handleDelete(computer.id)}
                  className="bg-red-500 text-white px-4 py-1 rounded"
                >
                  Eliminar
                </button>
                {/* Botón para editar o modificar */}
                <button
                  onClick={() => {
                    setCurrentComputer(computer); //Establecer el equipo actual a editar
                    setIsEditing(true); //abrir el modal
                  }}
                  className="bg-yellow-500 text-white px-4 py-1 rounded"
                >
                  Modificar
                </button>
                {/* Por ejemplo, un enlace a una página de edición */}
                {/* <Link href={`/editComputer/${computer.id}`}>Editar</Link> */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Mostrar modal de edición si está activo */}
      {isEditing && currentComputer && (
        <UpdateComputer
          computer={currentComputer}
          onClose={() => setIsEditing(false)}
          onUpdate={fetchComputers} // Refrescar la lista después de actualizar
        />
      )}

      {/* Enlace para cerrar sesión */}
      <div className="flex">
        <Link
          href="/dashboard"
          className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded mt-6"
        >
          Go Dashboard
        </Link>
        <Link
          onClick={(e) => {
            e.preventDefault(); // Prevenir la acción predeterminada del enlace
            supabase.auth.signOut(); // Cerrar sesión
            router.push("/"); // Redirigir a la página de inicio después de cerrar sesión
          }}
          href="#"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-500 hover:border-transparent rounded mt-6"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
};

export default ShowComputers;
