//src/app/components/UpdatePeripherals.js

"use client";

import { useEffect, useState } from "react";
import supabase from "@/utils/supabaseClient";
import { useForm } from "react-hook-form"; // Asegúrate de importar useForm

const UpdatePeripherals = ({ peripheral, onClose, onUpdate }) => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    defaultValues: peripheral // Establece los valores predeterminados desde el periférico
  });

  const handleSubmitForm = async (data) => {
    const { error } = await supabase
      .from("peripherals")
      .update(data) // Envía directamente los datos
      .eq("id", peripheral.id);

    if (error) {
      console.error("Error updating:", error.message);
    } else {
      onUpdate(); // Llama a la función para refrescar la lista
      onClose(); // Cierra el modal
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-4">Modify Peripherals</h2>
        <form onSubmit={handleSubmit(handleSubmitForm)}>
          <div className="mb-4">
            <label htmlFor="peripheralType" className="block text-sm font-medium text-gray-700">Type of Peripheral</label>
            <input
              type="text"
              id="peripheralType"
              {...register("peripheralType", { required: true })} // Registra el campo
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              required
            />
            {errors.peripheralType && <p className="text-red-500">{errors.peripheralType.message}</p>}
          </div>

          <div className="mb-4">
            <label htmlFor="ubication" className="block text-sm font-medium text-gray-700">Ubication</label>
            <select
              id="ubication"
              {...register("ubication", { required: true })} // Registra el campo
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              required
            >
              <option value="">Select a location</option>
              <option value="First Floor">First Floor</option>
              <option value="Second floor">Second floor</option>
              <option value="Third Floor">Third Floor</option>
              <option value="Fourth Floor">Fourth Floor</option>
              <option value="Fifth Floor">Fifth Floor</option>
              <option value="Local IT Office">Local IT Office</option>
              <option value="Amazonas Room">Amazonas Room</option>
            </select>
            {errors.ubication && <p className="text-red-500">{errors.ubication.message}</p>}
          </div>

          <div className="mb-4">
            <label htmlFor="brand" className="block text-sm font-medium text-gray-700">Brand</label>
            <input
              type="text"
              id="brand"
              {...register("brand", { required: true })} // Registra el campo
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              required
            />
            {errors.peripheralType && <p className="text-red-500">{errors.peripheralType.message}</p>}
          </div>

          <div className="mb-4">
            <label htmlFor="model" className="block text-sm font-medium text-gray-700">Model</label>
            <input
              type="text"
              id="model"
              {...register("model", { required: true })} // Registra el campo
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              required
            />
            {errors.peripheralType && <p className="text-red-500">{errors.peripheralType.message}</p>}
          </div>

          <div className="mb-4">
            <label htmlFor="serial" className="block text-sm font-medium text-gray-700">Serial</label>
            <input
              type="text"
              id="serial"
              {...register("serial", { required: true })} // Registra el campo
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              required
            />
            {errors.peripheralType && <p className="text-red-500">{errors.peripheralType.message}</p>}
          </div>

          <div className="mb-4">
            <label htmlFor="brand" className="block text-sm font-medium text-gray-700">Brand</label>
            <input
              type="text"
              id="brand"
              {...register("brand", { required: true })} // Registra el campo
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              required
            />
            {errors.peripheralType && <p className="text-red-500">{errors.peripheralType.message}</p>}
          </div>

          <div className="mb-4">
            <label
              htmlFor="physicalCondition"
              className="block text-sm font-medium text-gray-700"
            >
              Physical Condition
            </label>
            <select
              id="physicalCondition"
              {...register("physicalCondition")}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
            >
              <option value="">Select a condition</option>
              <option value="New">New</option>
              <option value="Used">Used</option>
              <option value="Damaged">Damaged</option>
            </select>
            {errors.physicalCondition && (
              <p>{errors.physicalCondition.message}</p>
            )}
          </div>
          {/* Aquí puedes agregar más campos según sea necesario */}

          <button type='submit' className='bg-blue-500 text-white px-4 py-1 rounded'>
            Save Changes</button>
          <button type='button' onClick={onClose} className='bg-gray-500 text-white px-4 py-1 rounded ml-2'>
            Cancel</button>
        </form>
      </div>
    </div>
  );
};

export default UpdatePeripherals;
