"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import logoImage from "@/public/ThalesLogo.png";
import Link from "next/link";
import supabase from "@/utils/supabaseClient"; // Asegúrate de que esta importación sea correcta
import { useState } from "react";
import { useForm } from "react-hook-form";

// Esquema de validación con Zod
const RegisterUserSchema = z.object({
  peripheralType: z
    .string()
    .min(2, { message: "The name must be at least 2 characters." }),
  brand: z.string().min(1, { message: "Product brand is required." }),
  model: z.string().min(1, { message: "Product model is required" }),
  serial: z.string().min(1, { message: "Serial number must be required" }),
  acquisition: z
    .string()
    .min(1, { message: "The date of acquisition is required" }),
  price: z.preprocess(
    (val) => {
      const parsed = parseFloat(val);
      return isNaN(parsed) ? undefined : parsed; // Returns undefined if not a number
    },
    z
      .number()
      .optional()
      .refine((val) => val === undefined || val > 0, {
        message: "The price must be a positive number",
      })
  ),
  ubication: z.string().min(1, { message: "Location is required" }),
  physicalCondition: z.enum(["new", "used", "damaged"], {
    errorMap: () => ({ message: "Select a valid physical condition" }),
  }),
  warranty: z.boolean(), // Changed to boolean
});

export default function PeripheralsForm() {
  const [successMessage, setSuccessMessage] = useState(""); // State to manage the state of success
  const {
    register, // Corrección aquí
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: zodResolver(RegisterUserSchema) });

  const onSubmit = async (data) => {
    console.log("Data before sending:", data);

    // Sanitize data before sending to Supabase
    const sanitizedData = {
      ...data,
      price: data.price === "" ? null : data.price,
    };
    console.log("Sanitized data before sending:", sanitizedData);

    // Send the data to Supabase
    const { data: insertData, error } = await supabase
      .from("peripherals")
      .insert([{ ...sanitizedData }]);

    if (error) {
      console.error("Error inserting data into the database: ", error);
      setSuccessMessage("");
    } else {
      console.log("Data inserted: ", insertData);
      setSuccessMessage("Data inserted correctly.");
      reset();
    }
  };

  return (
    <div className="flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-4xl">
        <div className="flex justify-center mb-6">
          <Image src={logoImage} alt="Thales Logo" width={150} height={50} />
        </div>
        <h2 className="text-2xl font-bold text-center mb-4">
          Register a Peripheral
        </h2>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          <div className="mb-4">
            <label
              htmlFor="peripheralType"
              className="block text-sm font-medium text-gray-700"
            >
              Name or Type
            </label>
            <input
              id="peripheralType"
              type="text"
              {...register("peripheralType")} // Corrección aquí
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
              placeholder="Enter the name or type of the peripheral"
            />
            {errors.peripheralType && <p>{errors.peripheralType.message}</p>}
          </div>

          <div className="mb-4">
            <label
              htmlFor="brand"
              className="block text-sm font-medium text-gray-700"
            >
              Brand
            </label>
            <input
              id="brand"
              type="text"
              {...register("brand")}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
              placeholder="Enter the brand of the peripheral"
            ></input>
            {errors.brand && <p>{errors.brand.message}</p>}
          </div>

          <div className="mb-4">
            <label
              htmlFor="model"
              className="block text-sm font-medium text-gray-700"
            >
              Model
            </label>
            <input
              id="model"
              type="text"
              {...register("model")}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
              placeholder="Enter the model of the peripheral"
            ></input>
            {errors.model && <p>{errors.model.message}</p>}
          </div>

          <div className="mb-4">
            <label
              htmlFor="serial"
              className="block text-sm font-medium text-gray-700"
            >
              Serial Number
            </label>
            <input
              id="serial"
              type="text"
              {...register("serial")}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
              placeholder="Enter the serial number"
            ></input>
            {errors.serial && <p>{errors.serial.message}</p>}
          </div>

          <div className="mb-4">
            <label
              htmlFor="acquisition"
              className="block text-sm font-medium text-gray-700"
            >
              Acquisition Date
            </label>
            <input
              id="acquisition"
              type="date"
              {...register("acquisition")}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
            ></input>
            {errors.acquisition && <p>{errors.acquisition.message}</p>}
          </div>

          <div className="mb-4">
            <label
              htmlFor="price"
              className="block text-sm font-medium text-gray-700"
            >
              Price
            </label>
            <input
              id="price"
              type="text"
              {...register("price")}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
              placeholder="Enter the price"
            ></input>
            {errors.price && <p> {errors.price.message} </p>}
          </div>

          <div className="mb-4">
            <label
              htmlFor="ubication"
              className="block text-sm font-medium text-gray-700"
            >
              Ubication
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
            {errors.ubication && <p>{errors.ubication.message}</p>}
          </div>

          <div className="mb-4">
            <label
              htmlFor="physicalCondition"
              className="block text-sm font-medium text-gray-700"
            >
              Physical Conditions
            </label>
            <input
              id="physicalCondition"
              type="text"
              {...register("physicalCondition")}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
              placeholder="Enter the physical conditions"
            ></input>
            {errors.physicalCondition && (
              <p> {errors.physicalCondition.message} </p>
            )}
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
              ¿The equipment has a guarantee?
            </label>
          </div>

          {/* Add other camps here! */}

          <button type="submit" className="mt-4 mr-2 bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded">
            Add
          </button>

          <Link            
            href="/dashboard"
            className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
            Go Dashboard
          </Link>

          <Link
            onClick={() => supabase.auth.signOut()}
            href="/"
            className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
            Go Home
          </Link>

        </form>
        {successMessage && <p className="text-green-500">{successMessage}</p>}
      </div>
    </div>
  );
}
