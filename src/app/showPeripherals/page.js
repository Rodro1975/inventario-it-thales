"use client";

import { useEffect, useState } from "react";
import supabase from "@/utils/supabaseClient";
import Image from "next/image";
import logoImage from "@/public/ThalesLogo.png";
import Link from "next/link"; // Asegúrate de importar Link
import { useRouter } from "next/navigation"; // Importar useRouter
import UpdateComputer from "../components/UpdateComputer";

const ShowPeripherals = () => {
  const [peripherals, setPeripherals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false); //Estado para controlar si estamos editando
  const [currentComputer, setCurrentComputer] = useState(null); //Estado para almacenar el equipo actual al editar
  const router = useRouter(); // Inicializa el router
};

// Function to get the data from the table