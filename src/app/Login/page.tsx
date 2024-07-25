"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useLogin from "@/hooks/useLogin";
import Loading from "@/components/Loading/Loading";

const LoginPage = () => {
  const { errors, handleLogin } = useLogin();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data = {
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    };
    await handleLogin(data, setIsLoading);
  };

  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        {isLoading ? (
          <div className="flex items-center justify-center min-h-screen">
            <Loading />
          </div>
        ) : (
          <div className="px-16 py-16 mt-4 text-left bg-white shadow-lg w-full max-w-md">
            <h3 className="text-3xl font-bold text-center">Inicia Sesión</h3>

            <form onSubmit={handleSubmit}>
              <div className="mt-4">
                <div>
                  <label className="block text-lg" htmlFor="email">
                    Email
                  </label>
                  <Input
                    type="text"
                    placeholder="Email"
                    className="w-full px-6 py-3 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-400 text-lg"
                    id="email"
                    name="email"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm">{errors.email}</p>
                  )}
                </div>
                <div className="mt-4">
                  <label className="block text-lg">Clave</label>
                  <Input
                    type="password"
                    placeholder="Password"
                    className="w-full px-6 py-3 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-400 text-lg"
                    id="password"
                    name="password"
                  />
                  {errors.password && (
                    <p className="text-red-500 text-sm">{errors.password}</p>
                  )}
                </div>
                <div className="flex items-baseline justify-between">
                  <Button
                    type="submit"
                    className="px-8 py-3 mt-4 text-white bg-green-400 rounded-lg hover:bg-green-900 text-lg"
                  >
                    Iniciar
                  </Button>
                  <a
                    href="#"
                    className="text-lg text-green-900 hover:underline"
                  >
                    ¿Olvidaste la clave?
                  </a>
                </div>
              </div>
            </form>
          </div>
        )}
      </div>
    </>
  );
};

export default LoginPage;
