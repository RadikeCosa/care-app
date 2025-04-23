import { TextAreaProps } from "../types/TextAreaProps";

const TextArea: React.FC<TextAreaProps> = ({
  label,
  name,
  value,
  onChange,
  placeholder,
}) => (
  <div className="mb-6">
    <label className="block text-sm font-bold mb-2" htmlFor={name}>
      {label}
    </label>
    <textarea
      id={name}
      name={name}
      value={value}
      onChange={onChange}
      rows={4}
      className="w-full border border-[var(--foreground)]/20 rounded-md py-2 px-3 bg-[var(--background)] text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
      placeholder={placeholder}
    />
  </div>
);

export default TextArea;
