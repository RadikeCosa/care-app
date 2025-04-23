import { RadioGroupProps } from "@/types/RadioGroup";

const RadioGroup: React.FC<RadioGroupProps> = ({
  label,
  name,
  options,
  value,
  onChange,
}) => (
  <div className="mb-6">
    <label className="block text-sm font-bold mb-2">{label}</label>
    <div className="flex flex-col space-y-2">
      {options.map((option: { value: string; label: string }) => (
        <div key={option.value} className="flex items-center">
          <input
            type="radio"
            id={`${name}-${option.value}`}
            name={name}
            value={option.value}
            checked={value === option.value}
            onChange={() => onChange(option.value)}
            className="mr-2 accent-blue-500"
          />
          <label htmlFor={`${name}-${option.value}`} className="text-sm">
            {option.label}
          </label>
        </div>
      ))}
    </div>
  </div>
);

export default RadioGroup;
