import type React from "react";
import type { UseFormRegister } from "react-hook-form";
import type { FormData } from "../types/FormData";

interface DateTimeInputProps {
  label: string;
  name: string;
  type: "date" | "time";
  register: UseFormRegister<FormData>;
  required?: boolean;
  min?: string;
  max?: string;
  error?: string;
}

const DateTimeInput: React.FC<DateTimeInputProps> = ({
  label,
  name,
  type,
  register,
  required = false,
  min,
  max,
  error,
}) => {
  // Usamos una función para manejar el registro de forma segura
  const registerField = () => {
    return register(name as string, {
      required: required ? `${label} es requerido` : false,
    });
  };

  return (
    <div className="flex-1 mb-2">
      <label className="block text-sm font-bold mb-1" htmlFor={name}>
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        type={type}
        id={name}
        {...registerField()}
        min={min}
        max={max}
        placeholder={
          type === "date" ? "Selecciona una fecha" : "Selecciona una hora"
        }
        className={`w-full border ${
          error ? "border-red-500" : "border-[var(--foreground)]/20"
        } rounded-md py-2 px-3 bg-[var(--background)] text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors`}
      />
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
};

export default DateTimeInput;
