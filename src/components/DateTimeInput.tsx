import type React from "react";
import type { UseFormRegister } from "react-hook-form";
import type { FormData } from "../types/FormData";
import { format, subDays, parseISO, isValid, isToday } from "date-fns";
import { es } from "date-fns/locale";

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
  // Función para registrar el campo
  const registerField = () => {
    return register(name as string, {
      required: required ? `${label} es requerido` : false,
    });
  };

  // Generar opciones para el select de fechas
  const generateDateOptions = () => {
    if (!min || !max) return [];

    const minDate = parseISO(min);
    const maxDate = parseISO(max);

    if (!isValid(minDate) || !isValid(maxDate)) return [];

    const options: { value: string; label: string; isToday: boolean }[] = [];
    let currentDate = maxDate; // Comenzar desde maxDate (hoy)
    const daysCount = 7; // Asumiendo un rango de 7 días como en FormularioCuidadores

    for (let i = 0; i < daysCount; i++) {
      const value = format(currentDate, "yyyy-MM-dd");
      const label = format(currentDate, "EEEE d 'de' MMMM", { locale: es });
      options.push({
        value,
        label,
        isToday: isToday(currentDate),
      });
      currentDate = subDays(currentDate, 1); // Retroceder un día
    }

    return options;
  };

  // Obtener la fecha actual para preselección
  const todayValue = max ? max : format(new Date(), "yyyy-MM-dd");

  return (
    <div className="flex-1 mb-2">
      <label className="block text-sm font-bold mb-1" htmlFor={name}>
        {label} {required && <span className="text-red-500">*</span>}
      </label>

      {type === "date" ? (
        <select
          id={name}
          {...registerField()}
          defaultValue={todayValue}
          className={`w-full border ${
            error ? "border-red-500" : "border-[var(--foreground)]/20"
          } rounded-md py-2 px-3 bg-[var(--background)] text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors`}
          aria-invalid={error ? "true" : "false"}
          aria-describedby={error ? `${name}-error` : undefined}
        >
          {generateDateOptions().map((option) => (
            <option key={option.value} value={option.value}>
              {option.label} {option.isToday && "(hoy)"}
            </option>
          ))}
        </select>
      ) : (
        <input
          type="time"
          id={name}
          {...registerField()}
          min={min}
          max={max}
          placeholder="Selecciona una hora"
          className={`w-full border ${
            error ? "border-red-500" : "border-[var(--foreground)]/20"
          } rounded-md py-2 px-3 bg-[var(--background)] text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors`}
          aria-invalid={error ? "true" : "false"}
          aria-describedby={error ? `${name}-error` : undefined}
        />
      )}

      {error && (
        <p id={`${name}-error`} className="text-red-500 text-xs mt-1">
          {error}
        </p>
      )}
    </div>
  );
};

export default DateTimeInput;
