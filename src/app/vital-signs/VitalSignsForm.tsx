// src/vital-signs/VitalSignsForm.tsx
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { vitalSignsSchema, VitalSignsSchema } from "@/utils/validators";
import TemperatureInput from "@/components/TemperatureInput";

export default function VitalSignsForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<VitalSignsSchema>({
    resolver: zodResolver(vitalSignsSchema),
    mode: "onBlur", // valida al momento de perder el foco
  });

  const onSubmit = (data: VitalSignsSchema) => {
    console.log("Datos validados:", data);
    // Acá se van a enviar los datos para almacenar y armar el reporte
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="max-w-md mx-auto bg-white dark:bg-gray-900 p-6 rounded-lg shadow-md space-y-6"
    >
      <TemperatureInput register={register} error={errors.temperature} />
      <button
        type="submit"
        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-md transition"
      >
        Enviar
      </button>
    </form>
  );
}
