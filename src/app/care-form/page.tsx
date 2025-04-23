"use client";

import { useState } from "react";
import DateTimeInput from "../../components/DateTimeInput";
import RadioGroup from "../../components/RadioGroup";
import TextArea from "../../components/TextArea";
import Reporte from "../../components/Report"; // Ensure the file exists at this path or adjust the path accordingly
import type { FormData } from "../../types/FormData";

export default function FormularioCuidadores() {
  const [formData, setFormData] = useState<FormData>({});
  const [medicacion, setMedicacion] = useState<string>("");
  const [tomoMedicacion, setTomoMedicacion] = useState<string>("");
  const [reporte, setReporte] = useState<FormData | null>(null);
  const [mostrarReporte, setMostrarReporte] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Restricciones de fecha
  const today = new Date();
  const maxDate = today.toISOString().split("T")[0];
  const minDate = new Date(today.setDate(today.getDate() - 7))
    .toISOString()
    .split("T")[0];

  // Manejo de cambios en el formulario
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Validación de fechas
  const validateDates = () => {
    if (
      !formData.fecha ||
      !formData.hora ||
      !formData["fecha-salida"] ||
      !formData["hora-salida"]
    ) {
      return "Por favor, completa todos los campos de fecha y hora.";
    }
    const ingreso = new Date(`${formData.fecha}T${formData.hora}`);
    const salida = new Date(
      `${formData["fecha-salida"]}T${formData["hora-salida"]}`
    );
    if (isNaN(ingreso.getTime()) || isNaN(salida.getTime())) {
      return "Fechas u horas inválidas.";
    }
    if (salida <= ingreso) {
      return "La fecha y hora de salida deben ser posteriores a la de ingreso.";
    }
    return null;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validationError = validateDates();
    if (validationError) {
      setError(validationError);
      setSuccess(null);
      return;
    }
    setError(null);
    try {
      const form = e.currentTarget;
      const data = Object.fromEntries(new FormData(form).entries()) as FormData;
      console.log("Datos del formulario:", data);
      setReporte(data);
      setMostrarReporte(true);
      setSuccess("Reporte generado exitosamente");
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      console.error("Error al procesar el formulario:", err);
      setError("Error al generar el reporte. Por favor, intenta de nuevo.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[var(--background)] text-[var(--foreground)] font-[family-name:var(--font-geist-sans)]">
      <div className="w-full max-w-lg">
        <form
          className="bg-[var(--background)] shadow-md rounded-lg p-6"
          onSubmit={handleSubmit}
        >
          {error && <p className="text-red-500 mb-4">{error}</p>}
          {success && <p className="text-green-500 mb-4">{success}</p>}

          {/* Día y horario de llegada */}
          <div className="mb-6">
            <label className="block text-sm font-bold mb-2">
              Día y horario de llegada
            </label>
            <div className="flex flex-col md:flex-row md:space-x-4">
              <DateTimeInput
                label="Fecha"
                name="fecha"
                type="date"
                value={formData.fecha || ""}
                onChange={handleChange}
                min={minDate}
                max={maxDate}
              />
              <DateTimeInput
                label="Hora"
                name="hora"
                type="time"
                value={formData.hora || ""}
                onChange={handleChange}
              />
            </div>
          </div>

          <RadioGroup
            label="Estado de conciencia del/la paciente a la llegada"
            name="estado-conciencia"
            options={[
              { value: "vigil", label: "Vigil" },
              { value: "durmiendo", label: "Durmiendo" },
              { value: "soporoso", label: "Soporoso" },
            ]}
            value={formData["estado-conciencia"] || ""}
            onChange={(value: string) =>
              setFormData((prev: FormData) => ({
                ...prev,
                "estado-conciencia": value,
              }))
            }
          />

          <RadioGroup
            label="Estado del/la paciente a la llegada"
            name="estado-paciente"
            options={
              [
                { value: "solo", label: "Solo" },
                { value: "familiar", label: "Familiar" },
                { value: "cuidador", label: "Cuidador" },
              ] as { value: string; label: string }[]
            }
            value={formData["estado-paciente"] || ""}
            onChange={(value: string) =>
              setFormData((prev: FormData) => ({
                ...prev,
                "estado-paciente": value,
              }))
            }
          />

          {/* Estado físico */}
          <div className="mb-6">
            <label className="block text-sm font-bold mb-2">
              Estado físico del/la paciente a la llegada
            </label>
            <p className="text-sm mb-2">¿Estaba acostado o levantado?</p>
            <RadioGroup
              label="Posición del paciente"
              name="posicion"
              options={
                [
                  { value: "acostado", label: "Acostado" },
                  { value: "levantado", label: "Levantado" },
                ] as { value: string; label: string }[]
              }
              value={formData.posicion || ""}
              onChange={(value: string) =>
                setFormData((prev: FormData) => ({ ...prev, posicion: value }))
              }
            />
            <p className="text-sm mb-2">Condiciones de higiene</p>
            <RadioGroup
              label="Condiciones de higiene"
              name="higiene"
              options={
                [
                  { value: "buenas", label: "Buenas" },
                  { value: "regulares", label: "Regulares" },
                  { value: "malas", label: "Malas" },
                ] as { value: string; label: string }[]
              }
              value={formData.higiene || ""}
              onChange={(value: string) =>
                setFormData((prev: FormData) => ({ ...prev, higiene: value }))
              }
            />
          </div>

          <RadioGroup
            label="Estado de ánimo general"
            name="estado-animo"
            options={
              [
                { value: "bueno", label: "Bueno" },
                { value: "regular", label: "Regular" },
                { value: "malo", label: "Malo" },
              ] as { value: string; label: string }[]
            }
            value={formData["estado-animo"] || ""}
            onChange={(value: string) =>
              setFormData((prev: FormData) => ({
                ...prev,
                "estado-animo": value,
              }))
            }
          />

          <RadioGroup
            label="¿Hay medicación para recordarle?"
            name="medicacion"
            options={
              [
                { value: "si", label: "Sí" },
                { value: "no", label: "No" },
              ] as { value: string; label: string }[]
            }
            value={medicacion}
            onChange={(value: string) => {
              setMedicacion(value);
              setFormData((prev: FormData) => ({ ...prev, medicacion: value }));
            }}
          />

          {medicacion === "si" && (
            <RadioGroup
              label="¿Tomó la medicación?"
              name="tomo-medicacion"
              options={
                [
                  { value: "si", label: "Sí" },
                  { value: "no", label: "No" },
                ] as { value: string; label: string }[]
              }
              value={tomoMedicacion}
              onChange={(value: string) => {
                setTomoMedicacion(value);
                setFormData((prev: FormData) => ({
                  ...prev,
                  "tomo-medicacion": value,
                }));
              }}
            />
          )}

          {tomoMedicacion === "si" && (
            <RadioGroup
              label="¿La tomó en horario?"
              name="horario-medicacion"
              options={
                [
                  { value: "si", label: "Sí" },
                  { value: "no", label: "No" },
                ] as { value: string; label: string }[]
              }
              value={formData["horario-medicacion"] || ""}
              onChange={(value: string) =>
                setFormData((prev: FormData) => ({
                  ...prev,
                  "horario-medicacion": value,
                }))
              }
            />
          )}

          {/* Actividades realizadas */}
          <div className="mb-6">
            <label className="block text-sm font-bold mb-2">
              Actividades realizadas
            </label>
            <div className="flex flex-col space-y-4">
              <div>
                <p className="text-sm mb-2">¿Realizó actividad física?</p>
                <RadioGroup
                  label="Actividad física"
                  name="actividad-fisica"
                  options={
                    [
                      { value: "si", label: "Sí" },
                      { value: "no", label: "No" },
                    ] as { value: string; label: string }[]
                  }
                  value={formData["actividad-fisica"] || ""}
                  onChange={(value: string) =>
                    setFormData((prev: FormData) => ({
                      ...prev,
                      "actividad-fisica": value,
                    }))
                  }
                />
              </div>
              <div>
                <p className="text-sm mb-2">¿Se hidrató adecuadamente?</p>
                <RadioGroup
                  label="Hidratación"
                  name="hidratacion"
                  options={
                    [
                      { value: "si", label: "Sí" },
                      { value: "no", label: "No" },
                    ] as { value: string; label: string }[]
                  }
                  value={formData.hidratacion || ""}
                  onChange={(value: string) =>
                    setFormData((prev: FormData) => ({
                      ...prev,
                      hidratacion: value,
                    }))
                  }
                />
              </div>
              <div>
                <p className="text-sm mb-2">¿Comió?</p>
                <RadioGroup
                  label="Alimentación"
                  name="comida"
                  options={
                    [
                      { value: "si", label: "Sí" },
                      { value: "no", label: "No" },
                    ] as { value: string; label: string }[]
                  }
                  value={formData.comida || ""}
                  onChange={(value: string) =>
                    setFormData((prev: FormData) => ({
                      ...prev,
                      comida: value,
                    }))
                  }
                />
              </div>
              <div>
                <p className="text-sm mb-2">¿Tuvo catarsis?</p>
                <RadioGroup
                  label="Catarsis"
                  name="catarsis"
                  options={
                    [
                      { value: "positiva", label: "Positiva" },
                      { value: "negativa", label: "Negativa" },
                    ] as { value: string; label: string }[]
                  }
                  value={formData.catarsis || ""}
                  onChange={(value: string) =>
                    setFormData((prev: FormData) => ({
                      ...prev,
                      catarsis: value,
                    }))
                  }
                />
              </div>
              <div>
                <p className="text-sm mb-2">¿Tuvo diuresis?</p>
                <RadioGroup
                  label="Diuresis"
                  name="diuresis"
                  options={
                    [
                      { value: "positiva", label: "Positiva" },
                      { value: "negativa", label: "Negativa" },
                    ] as { value: string; label: string }[]
                  }
                  value={formData.diuresis || ""}
                  onChange={(value: string) =>
                    setFormData((prev: FormData) => ({
                      ...prev,
                      diuresis: value,
                    }))
                  }
                />
              </div>
            </div>
          </div>

          {/* Observaciones */}
          <TextArea
            label="Observaciones"
            name="observaciones"
            value={formData.observaciones || ""}
            onChange={handleChange}
            placeholder="Escribe cualquier observación relevante sobre el paciente..."
          />

          {/* Pautas de alarma */}
          <TextArea
            label="Pautas de alarma"
            name="pautas-alarma"
            value={formData["pautas-alarma"] || ""}
            onChange={handleChange}
            placeholder="Escribe las pautas de alarma a tener en cuenta..."
          />

          {/* Horario de salida */}
          <div className="mb-6">
            <label className="block text-sm font-bold mb-2">
              Horario de salida
            </label>
            <div className="flex flex-col md:flex-row md:space-x-4">
              <DateTimeInput
                label="Fecha"
                name="fecha-salida"
                type="date"
                value={formData["fecha-salida"] || ""}
                onChange={handleChange}
                min={minDate}
                max={maxDate}
              />
              <DateTimeInput
                label="Hora"
                name="hora-salida"
                type="time"
                value={formData["hora-salida"] || ""}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Botón de envío */}
          <div className="flex items-center justify-end">
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="submit"
            >
              Enviar
            </button>
          </div>
        </form>

        {mostrarReporte && reporte && <Reporte data={reporte} />}
      </div>
    </div>
  );
}
