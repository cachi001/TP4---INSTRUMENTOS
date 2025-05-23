import React from "react";

interface ReportePdfProps {
    instrumentoId: number;
}

    const ReportePdf: React.FC<ReportePdfProps> = ({ instrumentoId }) => {

    const descargarPdf = async () => {
        try {
        const response = await fetch(`http://localhost:8080/reporte/${instrumentoId}/pdf`, {
            method: "GET",
            headers: {
            "Content-Type": "application/pdf",
            },
        });

        if (!response.ok) {
            throw new Error("Error al descargar el PDF");
        }

        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);

        const link = document.createElement("a");
        link.href = url;
        link.download = `instrumento_${instrumentoId}.pdf`;
        document.body.appendChild(link);
        link.click();

        link.remove();
        window.URL.revokeObjectURL(url);

        } catch (error) {
        alert("No se pudo descargar el PDF: " + error);
        }
    };

    return (
        <div>
        <button
            onClick={descargarPdf}
            className="cursor-pointer border border-blue-600 text-blue-600 rounded px-4 py-2 hover:bg-blue-600 hover:text-white transition"
        >
            Descargar PDF del Instrumento
        </button>
        </div>
    );
};

export default ReportePdf;
