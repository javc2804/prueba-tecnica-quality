import { useCharacterStore } from "../stores/characterStore";
import { characterSchema } from "../models/characterSchema";
import { useToast } from "@/components/ui/use-toast";

export const useCreateCharacterForm = () => {
  const { character, setCharacter } = useCharacterStore();
  const { toast } = useToast();

  const handleChange = (e: any) => {
    setCharacter({ ...character, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    character.gender = "Male";
    const result = characterSchema.safeParse(character);
    let text, status;

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

  return { character, handleChange, handleSubmit, translateKeyToSpanish };
};
