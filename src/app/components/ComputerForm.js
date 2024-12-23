// src/app/components/ComputerForm.js
"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import logoImage from "@/public/ThalesLogo.png";
import Link from "next/link";
import { supabase } from "@/utils/supabaseClient";
import { useState } from "react"; // Importar useState para manejar mensajes

// Esquema de validación con Zod
const RegisterUserSchema = z.object({
  name: z
    .string()
    .min(2, { message: "El nombre debe tener al menos 2 caracteres." }),
  brand: z.string().min(1, { message: "La marca es requerida." }),
  model: z.string().min(1, { message: "El modelo es requerido." }),
  serviceTag: z.string().min(1, { message: "El Service Tag es requerido." }),
  acquisition: z
    .string()
    .min(1, { message: "La fecha de adquisición es requerida." }),
  price: z.preprocess(
    (val) => {
      const parsed = parseFloat(val);
      return isNaN(parsed) ? undefined : parsed; // Devuelve undefined si no es un número
    },
    z
      .number()
      .optional()
      .refine((val) => val === undefined || val > 0, {
        message: "El precio debe ser un número positivo.",
      })
  ),
  ubication: z.string().min(1, { message: "La ubicación es requerida." }),
  physicalCondition: z.enum(["nuevo", "usado", "dañado"], {
    errorMap: () => ({ message: "Selecciona una condición física válida." }),
  }),
  technicalSpecific: z.string().optional(),
  peripherals: z.string().optional(),
  warranty: z.boolean(), // Cambiado a booleano
});

export default function ComputerForm() {
  const [successMessage, setSuccessMessage] = useState(""); // Estado para manejar el mensaje de éxito
  const {
    register,
    handleSubmit,
    reset, // Para limpiar el formulario
    formState: { errors },
  } = useForm({
    resolver: zodResolver(RegisterUserSchema),
  });

  const onSubmit = async (data) => {
    console.log("Datos antes de enviar:", data);

    // Calcular el tiempo restante en años
    const acquisitionDate = new Date(data.acquisition);
    const currentDate = new Date();
    const timeDiff =
      acquisitionDate.getFullYear() + 5 - currentDate.getFullYear(); // Calcula los años restantes
    const timeRemain = timeDiff > 0 ? timeDiff : null; // Si no hay tiempo restante, se establece como null

    // Sanitizar datos antes de enviar a Supabase
    const sanitizedData = {
      ...data,
      price: data.price === "" ? null : data.price, // Asegúrate que price sea null si está vacío
      // No incluyas timeRemain en sanitizedData ya que se calcula automáticamente
    };

    console.log("Sanitized data before sending:", sanitizedData);

    // Enviar los datos a Supabase
    const { data: insertData, error } = await supabase
      .from("computers") // Asegúrate de que 'computers' sea tu tabla correcta
      .insert([{ ...sanitizedData, timeRemain }]); // Agregar timeRemain calculado

    if (error) {
      console.error("Error al insertar datos:", error);
      setSuccessMessage(""); // Limpiar mensaje si hay error
    } else {
      console.log("Datos insertados:", insertData);
      setSuccessMessage("Datos registrados correctamente."); // Mensaje de éxito
      reset(); // Limpiar el formulario después de enviar
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-4xl">
        <div className="flex justify-center mb-6">
          <Image src={logoImage} alt="Thales Logo" width={150} height={50} />
        </div>
        <h2 className="text-2xl font-bold text-center mb-4">
          Register a Computer
        </h2>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Nombre
            </label>
            <input
              id="name"
              type="text"
              {...register("name")}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
              placeholder="Ingresa el nombre del equipo ej. Latitud 5530"
            />
            {errors.name && <p>{errors.name.message}</p>}
          </div>

          <div className="mb-4">
            <label
              htmlFor="brand"
              className="block text-sm font-medium text-gray-700"
            >
              Marca
            </label>
            <input
              id="brand"
              type="text"
              {...register("brand")}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
              placeholder="Ingresa la marca del equipo ej. Dell"
            />
            {errors.brand && <p>{errors.brand.message}</p>}
          </div>

          <div className="mb-4">
            <label
              htmlFor="model"
              className="block text-sm font-medium text-gray-700"
            >
              Modelo
            </label>
            <input
              id="model"
              type="text"
              {...register("model")}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
              placeholder="Ingresa el modelo ej. 5530"
            />
            {errors.model && <p>{errors.model.message}</p>}
          </div>

          <div className="mb-4">
            <label
              htmlFor="serviceTag"
              className="block text-sm font-medium text-gray-700"
            >
              Service Tag
            </label>
            <input
              id="serviceTag"
              type="text"
              {...register("serviceTag")}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
              placeholder="Ingresa el ST ej. G8NLLL3"
            />
            {errors.serviceTag && <p>{errors.serviceTag.message}</p>}
          </div>

          <div className="mb-4">
            <label
              htmlFor="acquisition"
              className="Block text-sm font-medium text-gray-700"
            >
              Fecha de adquisición
            </label>
            <input
              id="acquisition"
              type="date"
              {...register("acquisition")}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
            />
            {errors.acquisition && <p>{errors.acquisition.message}</p>}
          </div>

          <div className="mb-4">
            <label
              htmlFor="price"
              className="block text-sm font-medium text-gray-700"
            >
              Precio
            </label>
            <input
              id="price"
              type="number"
              {...register("price")}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
              placeholder="Ingresa el costo $ del equipo"
            />
            {errors.price && <p>{errors.price.message}</p>}
          </div>

          <div className="mb-4">
            <label
              htmlFor="ubication"
              className="block text-sm font-medium text-gray-700"
            >
              Ubicación
            </label>
            <select
              id="ubication"
              {...register("ubication")}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
            >
              <option value="">Selecciona una ubicación</option>
              <option value="primer">Primer Piso</option>
              <option value="segundo">Segundo Piso</option>
              <option value="tercer">Tercer Piso</option>
              <option value="cuarto">Cuarto Piso</option>
              <option value="quinto">Quinto Piso</option>
              <option value="cundinamarca">Sala Cundinamarca</option>
              <option value="amazonas">Sala Amazonas</option>
            </select>
            {errors.ubication && (
              <p>{errors.ubication.message}</p>
            )}
          </div>

          <div className="mb-4">
            <label
              htmlFor="physicalCondition"
              className="block text-sm font-medium text-gray-700"
            >
              Condición Física
            </label>
            <select
              id="physicalCondition"
              {...register("physicalCondition")}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
            >
              <option value="">Selecciona una condición</option>
              <option value="nuevo">Nuevo</option>
              <option value="usado">Usado</option>
              <option value="dañado">Dañado</option>
            </select>
            {errors.physicalCondition && (
              <p>{errors.physicalCondition.message}</p>
            )}
          </div>

          <div className="mb-4">
            <label
              htmlFor="technicalSpecific"
              className="block text-sm font-medium text-gray-700"
            >
              Especificaciones Técnicas
            </label>
            <input
              id="technicalSpecific"
              type="text"
              {...register("technicalSpecific")}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
              placeholder="Ingresa memoria procesador etc."
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="peripherals"
              className="block text-sm font-medium text-gray-700"
            >
              Periféricos
            </label>
            <textarea
              id="peripherals"
              {...register("peripherals")}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
              placeholder="Periféricos relacionados ej. monitor, docking"
              rows={4} // Puedes ajustar el número de filas según sea necesario
            />
          </div>

          <div className="mb-4 flex items-center">
            <input
              id="warranty"
              type="checkbox"
              {...register("warranty")}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label
              htmlFor="warranty"
              className="ml-2 block text-sm font-medium text-gray-700"
            >
              ¿El equipo tiene garantía?
            </label>
          </div>

          {/*<div>
            <label
              htmlFor="timeRemain"
              className="block text-sm font-medium text-gray-700"
            >
              Tiempo Restante de Garantía
            </label>
            <input
              id="timeRemain"
              type="text"
              {...register("timeRemain")}
              className=" mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
              placeholder="Este campo se calculara automaticamente"
            />
          </div>*/}

          <button
            type="submit"
            className="mt-4 mr-2 bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
          >
            Add
          </button>
          <Link
            onClick={() => supabase.auth.signOut()}
            href="/"
            className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
          >
            Go Home
          </Link>
          <Link
            
            href="/dashboard"
            className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
          >
            Go Dashboard
          </Link>
        </form>
      </div>
    </div>
  );
}
