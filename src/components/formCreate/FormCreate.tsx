"use client";

import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Input } from "../ui/input";
import { Button } from "@/components/ui/button";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";
import { useCharacterStore } from "../../stores/characterStore";
import { characterSchema } from "../../models/characterSchema";

const FormCreate = () => {
  const { character, setCharacter } = useCharacterStore();

  const { toast } = useToast();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setCharacter({ ...character, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let text;
    let status;
    character.gender = "Male";
    const result = characterSchema.safeParse(character);
    if (!result.success) {
      console.error(result.error);
      text = "Verifica el formulario, hay campos incorrectos";
      status = "Error";
    } else {
      text = "Personaje creado correctamente";
      status = "Correcto";
    }

    toast({
      title: status,
      description: text,
    });
    console.log("Personaje válido:", result.data);
  };

  const translateKeyToSpanish = (key: string) => {
    const translations: { [key: string]: string } = {
      name: "Nombre",
      status: "Estado",
      species: "Especie",
      type: "Tipo",
      gender: "Género",
      created: "Creado",
    };
    return translations[key] || key;
  };

  return (
    <div
      className="flex flex-col justify-center items-center h-screen"
      style={{
        backgroundImage: `
        linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.8)),
        url('https://gogocatrina.com/wp-content/uploads/2021/09/personajes-animados-rick-y-morty-660x400.jpg')
      `,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <h1 className="text-2xl font-bold mb-4 text-white">Crear personaje</h1>{" "}
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg bg-gray-100 shadow-lg rounded-lg p-5"
      >
        <div className="flex flex-wrap -mx-3 mb-6">
          {Object.entries(character).map(([key, value]) =>
            key !== "created" ? (
              <div key={key} className="w-full px-3 mb-6 md:mb-0">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor={key}
                >
                  {translateKeyToSpanish(key)}
                </label>
                {key === "gender" ? (
                  <Select name="gender">
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Seleccionar género" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Género</SelectLabel>
                        <SelectItem
                          className="hover:bg-green-400 focus:bg-green-400"
                          value="Male"
                        >
                          Masculino
                        </SelectItem>
                        <SelectItem
                          className="hover:bg-green-400 focus:bg-green-400"
                          value="Female"
                        >
                          Femenino
                        </SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                ) : (
                  <Input
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-green-300 focus:border-green-500"
                    id={key}
                    name={key}
                    value={value}
                    onChange={handleChange}
                  />
                )}
              </div>
            ) : null
          )}
          <div className="w-full flex justify-end items-end px-3">
            <Button
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Crear personaje
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default FormCreate;
