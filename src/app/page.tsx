"use client";
import React from "react";
import { useRouter } from "next/navigation";

const Page: React.FC = () => {
  const router = useRouter();

  const handleRedirect = () => {
    router.push("/Login");
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="text-center p-8 bg-white shadow-md rounded-md">
        <h1 className="text-4xl font-bold mb-4">
          Bienvenido a Rick y Morty Sistema
        </h1>
        <p className="text-lg mb-8">
          Presiona el botón para redireccionar a la ruta del login
        </p>
        <button
          onClick={handleRedirect}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          Ir al Login
        </button>
      </div>
    </div>
  );
};

export default Page;
