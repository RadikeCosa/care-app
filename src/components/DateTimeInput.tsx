import { DateTimeInputProps } from "../types/DateTimeInputProps";

const DateTimeInput: React.FC<DateTimeInputProps> = ({
  label,
  name,
  type,
  value,
  onChange,
  min,
  max,
}) => (
  <div className="flex-1">
    <label className="block text-sm font-bold mb-1" htmlFor={name}>
      {label}
    </label>
    <input
      type={type}
      id={name}
      name={name}
      value={value}
      onChange={onChange}
      min={min}
      max={max}
      placeholder={
        type === "date" ? "Selecciona una fecha" : "Selecciona una hora"
      }
      className="w-full border border-[var(--foreground)]/20 rounded-md py-2 px-3 bg-[var(--background)] text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
    />
  </div>
);

export default DateTimeInput;
