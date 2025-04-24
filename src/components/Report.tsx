"use client";

import type React from "react";

import { useState } from "react";
import type { FormData } from "../types/FormData";
import { jsPDF } from "jspdf";

interface ReporteProps {
  data: FormData;
}

const Reporte: React.FC<ReporteProps> = ({ data }) => {
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);

  const formatDate = (date?: string) => {
    if (!date) return "no especificado";
    const [year, month, day] = date.split("-");
    return `${day}/${month}/${year}`;
  };

  const formatTime = (time?: string) => time || "no especificado";

  const calculateHours = () => {
    if (
      !data.fecha ||
      !data.hora ||
      !data["fecha-salida"] ||
      !data["hora-salida"]
    ) {
      return "no calculado";
    }
    const start = new Date(`${data.fecha}T${data.hora}`);
    const end = new Date(`${data["fecha-salida"]}T${data["hora-salida"]}`);
    const diffMs = end.getTime() - start.getTime();
    const diffHours = diffMs / (1000 * 60 * 60);
    return diffHours.toFixed(2);
  };

  const medicacionText = () => {
    if (data.medicacion !== "si")
      return "El paciente no tiene medicación prescrita.";
    if (data["tomo-medicacion"] !== "si")
      return "El paciente tiene medicación prescrita, pero no la tomó.";
    if (data["horario-medicacion"] === "si")
      return "El paciente tiene medicación prescrita y la tomó en horario.";
    return "El paciente tiene medicación prescrita y la tomó, pero no en horario.";
  };

  const generatePDF = () => {
    setIsGeneratingPDF(true);
    try {
      const doc = new jsPDF();

      // Título
      doc.setFontSize(18);
      doc.text("Reporte de Visita", 105, 20, { align: "center" });

      // Contenido
      doc.setFontSize(12);

      let y = 40;
      const lineHeight = 7;

      // Información general
      doc.text(`Fecha de visita: ${formatDate(data.fecha)}`, 20, y);
      y += lineHeight;
      doc.text(`Hora de llegada: ${formatTime(data.hora)} hs`, 20, y);
      y += lineHeight;
      doc.text(
        `Estado de conciencia: ${
          data["estado-conciencia"] || "no especificado"
        }`,
        20,
        y
      );
      y += lineHeight;
      doc.text(
        `Acompañado de: ${data["estado-paciente"] || "no especificado"}`,
        20,
        y
      );
      y += lineHeight * 1.5;

      // Estado físico
      doc.text("Estado físico:", 20, y);
      y += lineHeight;
      doc.text(`- Posición: ${data.posicion || "no especificado"}`, 25, y);
      y += lineHeight;
      doc.text(`- Higiene: ${data.higiene || "no especificadas"}`, 25, y);
      y += lineHeight;
      doc.text(
        `- Estado de ánimo: ${data["estado-animo"] || "no especificado"}`,
        25,
        y
      );
      y += lineHeight * 1.5;

      // Medicación
      doc.text("Medicación:", 20, y);
      y += lineHeight;
      doc.text(`- ${medicacionText()}`, 25, y);
      y += lineHeight * 1.5;

      // Actividades
      doc.text("Actividades realizadas:", 20, y);
      y += lineHeight;
      doc.text(
        `- Actividad física: ${data["actividad-fisica"] || "no especificado"}`,
        25,
        y
      );
      y += lineHeight;
      doc.text(
        `- Hidratación: ${data.hidratacion || "no especificado"}`,
        25,
        y
      );
      y += lineHeight;
      doc.text(`- Comida: ${data.comida || "no especificado"}`, 25, y);
      y += lineHeight;
      doc.text(`- Catarsis: ${data.catarsis || "no especificado"}`, 25, y);
      y += lineHeight;
      doc.text(`- Diuresis: ${data.diuresis || "no especificado"}`, 25, y);
      y += lineHeight * 1.5;

      // Horas
      doc.text(`Total de horas: ${calculateHours()} hs`, 20, y);
      y += lineHeight;
      doc.text(
        `Salida: ${formatDate(data["fecha-salida"])} a las ${formatTime(
          data["hora-salida"]
        )} hs`,
        20,
        y
      );
      y += lineHeight * 1.5;

      // Observaciones
      if (data.observaciones) {
        doc.text("Observaciones:", 20, y);
        y += lineHeight;
        doc.text(data.observaciones, 25, y, { maxWidth: 160 });
        y += lineHeight * 2;
      }

      // Pautas de alarma
      if (data["pautas-alarma"]) {
        doc.setTextColor(255, 0, 0);
        doc.text("PAUTAS DE ALARMA:", 20, y);
        y += lineHeight;
        doc.text(data["pautas-alarma"], 25, y, { maxWidth: 160 });
        doc.setTextColor(0, 0, 0);
      }

      // Guardar PDF
      doc.save(`reporte_visita_${formatDate(data.fecha)}.pdf`);
    } catch (error) {
      console.error("Error al generar PDF:", error);
      alert("Error al generar el PDF. Por favor, intenta de nuevo.");
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  return (
    <div className="mt-8 p-6 bg-[var(--background)] border border-[var(--foreground)]/20 rounded-md">
      <h2 className="text-xl font-bold mb-4">Reporte de Visita</h2>
      <p className="mb-2">
        Llegó al domicilio el día {formatDate(data.fecha)} a las{" "}
        {formatTime(data.hora)} hs. El paciente se encuentra{" "}
        {data["estado-conciencia"] || "no especificado"}, acompañado de{" "}
        {data["estado-paciente"] || "no especificado"}.
      </p>
      <p className="mb-2">
        Estado físico: {data.posicion || "no especificado"}, con condiciones de
        higiene {data.higiene || "no especificadas"}.
      </p>
      <p className="mb-2">
        Estado de ánimo: {data["estado-animo"] || "no especificado"}.
      </p>
      <p className="mb-2">{medicacionText()}</p>
      <div className="mb-2">
        <p className="font-semibold">Actividades realizadas:</p>
        <ul className="list-disc pl-5 mt-1">
          <li>
            Actividad física: {data["actividad-fisica"] || "no especificado"}
          </li>
          <li>Hidratación: {data.hidratacion || "no especificado"}</li>
          <li>Comida: {data.comida || "no especificado"}</li>
          <li>Catarsis: {data.catarsis || "no especificado"}</li>
          <li>Diuresis: {data.diuresis || "no especificado"}</li>
        </ul>
      </div>
      <p className="mb-2">
        Total de horas: {calculateHours()} hs. Ingreso: {formatDate(data.fecha)}{" "}
        a las {formatTime(data.hora)}. Salida:{" "}
        {formatDate(data["fecha-salida"])} a las{" "}
        {formatTime(data["hora-salida"])}.
      </p>
      {data.observaciones && (
        <p className="mb-2">Observaciones: {data.observaciones}</p>
      )}
      {data["pautas-alarma"] && (
        <div className="mt-4 p-4 bg-red-100 border border-red-500 rounded-md">
          <p className="font-bold text-red-700">
            Pautas de alarma: {data["pautas-alarma"]}
          </p>
        </div>
      )}
      <button
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors disabled:bg-blue-300"
        onClick={generatePDF}
        disabled={isGeneratingPDF}
      >
        {isGeneratingPDF ? "Generando PDF..." : "Descargar Reporte (PDF)"}
      </button>
    </div>
  );
};

export default Reporte;
