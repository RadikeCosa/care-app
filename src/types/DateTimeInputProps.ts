export interface DateTimeInputProps {
  label: string;
  name: string;
  type: "date" | "time";
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  min?: string;
  max?: string;
}
