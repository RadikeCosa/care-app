"use client";

import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import DateTimeInput from "../../components/DateTimeInput";
import RadioGroup from "../../components/RadioGroup";
import TextArea from "../../components/TextArea";
import Reporte from "../../components/Report";
import type { FormData } from "../../types/FormData";

export default function FormularioCuidadores() {
  const [mostrarReporte, setMostrarReporte] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Restricciones de fecha
  const today = new Date();
  const maxDate = today.toISOString().split("T")[0];
  const minDate = new Date(today.setDate(today.getDate() - 7))
    .toISOString()
    .split("T")[0];

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      medicacion: "",
      "tomo-medicacion": "",
      "horario-medicacion": "",
    },
  });

  // Observar valores para lógica condicional
  const medicacion = watch("medicacion");
  const tomoMedicacion = watch("tomo-medicacion");

  // Validación de fechas
  const validateDates = (data: FormData) => {
    if (
      !data.fecha ||
      !data.hora ||
      !data["fecha-salida"] ||
      !data["hora-salida"]
    ) {
      return "Por favor, completa todos los campos de fecha y hora.";
    }

    const ingreso = new Date(`${data.fecha}T${data.hora}`);
    const salida = new Date(`${data["fecha-salida"]}T${data["hora-salida"]}`);

    if (isNaN(ingreso.getTime()) || isNaN(salida.getTime())) {
      return "Fechas u horas inválidas.";
    }

    if (salida <= ingreso) {
      return "La fecha y hora de salida deben ser posteriores a la de ingreso.";
    }

    return null;
  };

  const onSubmit: SubmitHandler<FormData> = (data) => {
    const validationError = validateDates(data);
    if (validationError) {
      setError(validationError);
      setSuccess(null);
      return;
    }

    setError(null);
    try {
      console.log("Datos del formulario:", data);
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
      <div className="w-full max-w-lg p-4">
        <h1 className="text-2xl font-bold mb-6 text-center">
          Formulario de Cuidadores
        </h1>

        <form
          className="bg-[var(--background)] shadow-md rounded-lg p-6"
          onSubmit={handleSubmit(onSubmit)}
        >
          {error && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
              {error}
            </div>
          )}

          {success && (
            <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded">
              {success}
            </div>
          )}

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
                register={register}
                required
                min={minDate}
                max={maxDate}
                error={errors.fecha?.message}
              />
              <DateTimeInput
                label="Hora"
                name="hora"
                type="time"
                register={register}
                required
                error={errors.hora?.message}
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
            register={register}
            required
            error={errors["estado-conciencia"]?.message}
          />

          <RadioGroup
            label="Estado del/la paciente a la llegada"
            name="estado-paciente"
            options={[
              { value: "solo", label: "Solo" },
              { value: "familiar", label: "Familiar" },
              { value: "cuidador", label: "Cuidador" },
            ]}
            register={register}
            required
            error={errors["estado-paciente"]?.message}
          />

          {/* Estado físico */}
          <div className="mb-6">
            <label className="block text-sm font-bold mb-2">
              Estado físico del/la paciente a la llegada
            </label>
            <p className="text-sm mb-2">¿Estaba acostado o levantado?</p>
            <RadioGroup
              label=""
              name="posicion"
              options={[
                { value: "acostado", label: "Acostado" },
                { value: "levantado", label: "Levantado" },
              ]}
              register={register}
              required
              error={errors.posicion?.message}
            />
            <p className="text-sm mb-2">Condiciones de higiene</p>
            <RadioGroup
              label=""
              name="higiene"
              options={[
                { value: "buenas", label: "Buenas" },
                { value: "regulares", label: "Regulares" },
                { value: "malas", label: "Malas" },
              ]}
              register={register}
              required
              error={errors.higiene?.message}
            />
          </div>

          <RadioGroup
            label="Estado de ánimo general"
            name="estado-animo"
            options={[
              { value: "bueno", label: "Bueno" },
              { value: "regular", label: "Regular" },
              { value: "malo", label: "Malo" },
            ]}
            register={register}
            required
            error={errors["estado-animo"]?.message}
          />

          <RadioGroup
            label="¿Hay medicación para recordarle?"
            name="medicacion"
            options={[
              { value: "si", label: "Sí" },
              { value: "no", label: "No" },
            ]}
            register={register}
            required
            error={errors.medicacion?.message}
          />

          {medicacion === "si" && (
            <RadioGroup
              label="¿Tomó la medicación?"
              name="tomo-medicacion"
              options={[
                { value: "si", label: "Sí" },
                { value: "no", label: "No" },
              ]}
              register={register}
              required={medicacion === "si"}
              error={errors["tomo-medicacion"]?.message}
            />
          )}

          {medicacion === "si" && tomoMedicacion === "si" && (
            <RadioGroup
              label="¿La tomó en horario?"
              name="horario-medicacion"
              options={[
                { value: "si", label: "Sí" },
                { value: "no", label: "No" },
              ]}
              register={register}
              required={medicacion === "si" && tomoMedicacion === "si"}
              error={errors["horario-medicacion"]?.message}
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
                  label=""
                  name="actividad-fisica"
                  options={[
                    { value: "si", label: "Sí" },
                    { value: "no", label: "No" },
                  ]}
                  register={register}
                  required
                  error={errors["actividad-fisica"]?.message}
                />
              </div>
              <div>
                <p className="text-sm mb-2">¿Se hidrató adecuadamente?</p>
                <RadioGroup
                  label=""
                  name="hidratacion"
                  options={[
                    { value: "si", label: "Sí" },
                    { value: "no", label: "No" },
                  ]}
                  register={register}
                  required
                  error={errors.hidratacion?.message}
                />
              </div>
              <div>
                <p className="text-sm mb-2">¿Comió?</p>
                <RadioGroup
                  label=""
                  name="comida"
                  options={[
                    { value: "si", label: "Sí" },
                    { value: "no", label: "No" },
                  ]}
                  register={register}
                  required
                  error={errors.comida?.message}
                />
              </div>
              <div>
                <p className="text-sm mb-2">¿Tuvo catarsis?</p>
                <RadioGroup
                  label=""
                  name="catarsis"
                  options={[
                    { value: "positiva", label: "Positiva" },
                    { value: "negativa", label: "Negativa" },
                  ]}
                  register={register}
                  required
                  error={errors.catarsis?.message}
                />
              </div>
              <div>
                <p className="text-sm mb-2">¿Tuvo diuresis?</p>
                <RadioGroup
                  label=""
                  name="diuresis"
                  options={[
                    { value: "positiva", label: "Positiva" },
                    { value: "negativa", label: "Negativa" },
                  ]}
                  register={register}
                  required
                  error={errors.diuresis?.message}
                />
              </div>
            </div>
          </div>

          {/* Observaciones */}
          <TextArea
            label="Observaciones"
            name="observaciones"
            register={register}
            placeholder="Escribe cualquier observación relevante sobre el paciente..."
            error={errors.observaciones?.message}
          />

          {/* Pautas de alarma */}
          <TextArea
            label="Pautas de alarma"
            name="pautas-alarma"
            register={register}
            placeholder="Escribe las pautas de alarma a tener en cuenta..."
            error={errors["pautas-alarma"]?.message}
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
                register={register}
                required
                min={minDate}
                max={maxDate}
                error={errors["fecha-salida"]?.message}
              />
              <DateTimeInput
                label="Hora"
                name="hora-salida"
                type="time"
                register={register}
                required
                error={errors["hora-salida"]?.message}
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

        {mostrarReporte && <Reporte data={watch()} />}
      </div>
    </div>
  );
}
