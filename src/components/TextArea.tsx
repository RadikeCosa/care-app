// src/components/TextArea.tsx
import type React from "react";
import type { TextAreaProps } from "../types/TextAreaProps";

const TextArea: React.FC<TextAreaProps> = ({
  label,
  name,
  register,
  placeholder,
  required = false,
  error,
}) => {
  // Usamos una función para manejar el registro de forma segura
  const registerField = () => {
    return register(name as Extract<keyof FormData, string>, {
      required: required ? `${label} es requerido` : false,
    });
  };

  return (
    <div className="mb-6">
      <label className="block text-sm font-bold mb-2" htmlFor={name}>
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <textarea
        id={name}
        {...registerField()}
        rows={4}
        className={`w-full border ${
          error ? "border-red-500" : "border-[var(--foreground)]/20"
        } rounded-md py-2 px-3 bg-[var(--background)] text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors`}
        placeholder={placeholder}
      />
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
};

export default TextArea;
