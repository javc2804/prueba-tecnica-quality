import { z } from "zod";

export const characterSchema = z.object({
  name: z.string().min(1, "El nombre es requerido"),
  status: z.string(),
  species: z.string(),
  type: z.string(),
  // gender: z.enum(["Male", "Female"]),
});
