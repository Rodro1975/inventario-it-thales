"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/utils/supabaseClient";


const UpdateComputer = ({ computer, onClose, onUpdate }) => {
  const [formData, setFormData] = useState(computer);

  useEffect(() => {
    setFormData(computer);
  }, [computer]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { error } = await supabase
      .from("computers")
      .update(formData)
      .eq("id", computer.id); // Asegúrate de que 'id' sea el nombre correcto del campo

    if (error) {
      console.error("Error al actualizar:", error.message);
    } else {
      onUpdate(); // Llama a la función para refrescar la lista
      onClose(); // Cierra el modal
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-4">Modificar Equipo</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nombre</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} required className="mt-1 block w-full p-2 border border-gray-300 rounded-md" />
          </div>
          <div className="mb-4">
            <label htmlFor="brand" className="block text-sm font-medium text-gray-700">Marca</label>
            <input type="text" name="brand" value={formData.brand} onChange={handleChange} required className="mt-1 block w-full p-2 border border-gray-300 rounded-md" />
          </div>
          <div className="mb-4">
            <label htmlFor="model" className="block text-sm font-medium text-gray-700">Modelo</label>
            <input type="text" name="model" value={formData.model} onChange={handleChange} required className="mt-1 block w-full p-2 border border-gray-300 rounded-md" />
          </div>
          <div className="mb-4">
            <label htmlFor="serviceTag" className="block text-sm font-medium text-gray-700">Service Tag</label>
            <input type="text" name="serviceTag" value={formData.serviceTag} onChange={handleChange} required className="mt-1 block w-full p-2 border border-gray-300 rounded-md" />
          </div>
          <div className="mb-4">
            <label htmlFor="ubication" className="block text-sm font-medium text-gray-700">Ubicación</label>
            <input type="text" name="ubication" value={formData.ubication} onChange={handleChange} required className="mt-1 block w-full p-2 border border-gray-300 rounded-md" />
          </div>
          <div className="mb-4">
            <label htmlFor="technicalSpecific" className="block text-sm font-medium text-gray-700">Especificaciones Técnicas</label>
            <input type="text" name="technicalSpecific" value={formData.technicalSpecific} onChange={handleChange} required className="mt-1 block w-full p-2 border border-gray-300 rounded-md" />
          </div>
          <div className="mb-4">
            <label htmlFor="peripherals" className="block text-sm font-medium text-gray-700">Periféricos</label>
            <input type="text" name="peripherals" value={formData.peripherals} onChange={handleChange} required className="mt-1 block w-full p-2 border border-gray-300 rounded-md" />
          </div>
          {/* Agrega más campos según sea necesario */}
          <button type='submit' className='bg-blue-500 text-white px-4 py-1 rounded'>Guardar Cambios</button>
          <button type='button' onClick={onClose} className='bg-gray-500 text-white px-4 py-1 rounded ml-2'>Cancelar</button>
        </form>
      </div>
    </div>
  );
};

export default UpdateComputer;
