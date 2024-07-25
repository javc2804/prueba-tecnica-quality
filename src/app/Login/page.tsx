"use client";
import React from "react";
import Head from "next/head";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useLogin from "@/hooks/useLogin";

const LoginPage = () => {
  const { errors, handleLogin } = useLogin();

  return (
    <>
      <Head>
        <title>Login</title>
      </Head>
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="px-16 py-16 mt-4 text-left bg-white shadow-lg w-full max-w-md">
          <h3 className="text-2xl font-bold text-center">Inicia Sesión</h3>
          <form onSubmit={handleLogin}>
            <div className="mt-4">
              <div>
                <label className="block" htmlFor="email">
                  Email
                </label>
                <Input
                  type="text"
                  placeholder="Email"
                  className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-400"
                  id="email"
                  name="email"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm">{errors.email}</p>
                )}
              </div>
              <div className="mt-4">
                <label className="block">Clave</label>
                <Input
                  type="password"
                  placeholder="Password"
                  className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-400"
                  id="password"
                  name="password"
                />
                {errors.password && (
                  <p className="text-red-500 text-sm">{errors.password}</p>
                )}
              </div>
              <div className="flex items-baseline justify-between">
                <Button className="px-6 py-2 mt-4 text-white bg-green-400 rounded-lg hover:bg-green-900">
                  Iniciar
                </Button>
                <a href="#" className="text-sm text-green-900 hover:underline">
                  ¿Olvidaste la clave?
                </a>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
