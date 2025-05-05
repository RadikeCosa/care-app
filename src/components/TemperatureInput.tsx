import { FieldError, UseFormRegister } from "react-hook-form";
import { VitalSignsSchema } from "@/utils/validators";

interface TemperatureInputProps {
  register: UseFormRegister<VitalSignsSchema>;
  error?: FieldError;
}

export default function TemperatureInput({
  register,
  error,
}: TemperatureInputProps) {
  return (
    <div className="flex flex-col gap-1">
      <label
        htmlFor="temperature"
        className="font-medium text-gray-700 dark:text-gray-200"
      >
        Temperatura (°C)
      </label>
      <input
        type="number"
        step="0.1"
        min="35"
        max="42"
        id="temperature"
        placeholder="36.5"
        {...register("temperature", { valueAsNumber: true })}
        className="w-24 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 p-3 rounded-md text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
      />
      {error && <span className="text-red-500 text-sm">{error.message}</span>}
    </div>
  );
}
