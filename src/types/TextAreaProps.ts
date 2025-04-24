// src/types/TextAreaProps.ts
import { UseFormRegister } from "react-hook-form";
import { FormData } from "./FormData";

export interface TextAreaProps {
  label: string;
  name: Extract<keyof FormData, string>;
  register: UseFormRegister<FormData>;
  placeholder: string;
  required?: boolean;
  error?: string;
}
