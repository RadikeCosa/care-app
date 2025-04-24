import type React from "react";
import type { UseFormRegister } from "react-hook-form";
import type { FormData } from "../types/FormData";

interface RadioGroupProps {
  label: string;
  name: keyof FormData;
  options: { value: string; label: string }[];
  register: UseFormRegister<FormData>;
  required?: boolean;
  error?: string;
}

const RadioGroup: React.FC<RadioGroupProps> = ({
  label,
  name,
  options,
  register,
  required = false,
  error,
}) => {
  // Usamos una función para manejar el registro de forma segura
  const registerField = () => {
    return register(name as string, {
      required: required ? `${label || name} es requerido` : false,
    });
  };

  return (
    <div className="mb-6">
      {label && (
        <label className="block text-sm font-bold mb-2">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <div className="flex flex-col space-y-2">
        {options.map((option) => (
          <div key={option.value} className="flex items-center">
            <input
              type="radio"
              id={`${name}-${option.value}`}
              {...registerField()}
              value={option.value}
              className="mr-2 accent-blue-500"
            />
            <label htmlFor={`${name}-${option.value}`} className="text-sm">
              {option.label}
            </label>
          </div>
        ))}
      </div>
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
};

export default RadioGroup;
