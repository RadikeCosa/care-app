// utils/validators.ts
import { z } from "zod";

export const vitalSignsSchema = z.object({
  temperature: z
    .number({
      required_error: "La temperatura es obligatoria",
      invalid_type_error: "Debe ser un número válido",
    })
    .min(35, "La temperatura no puede ser menor a 35°C")
    .max(42, "La temperatura no puede ser mayor a 42°C"),
});

// Tipo inferido para usar en el form
export type VitalSignsSchema = z.infer<typeof vitalSignsSchema>;
