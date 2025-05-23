// src/components/ReporteExcel.tsx
import React, { useState } from 'react';

const ReporteExcel: React.FC = () => {
    const [desde, setDesde] = useState('');
    const [hasta, setHasta] = useState('');

    const descargarExcel = async () => {
        try {
        const url = `http://localhost:8080/reporte/excel?desde=${encodeURIComponent(desde)}&hasta=${encodeURIComponent(hasta)}`;
        const response = await fetch(url);

        if (!response.ok) throw new Error('Error al descargar el archivo.');

        const blob = await response.blob();
        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = 'reporte_pedidos.xlsx';
        document.body.appendChild(link);
        link.click();
        link.remove();
        } catch (error) {
        alert('Hubo un problema al generar el Excel');
        console.error(error);
        }
    };

    return (
        <div className="max-w-md mx-auto bg-white shadow-lg rounded-xl p-8 mt-10 border border-gray-200">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">📊 Reporte de Pedidos</h2>
        <div className="flex flex-col gap-4">
            <div className="flex flex-col">
            <label className="text-gray-600 mb-1">Desde:</label>
            <input
                type="datetime-local"
                value={desde}
                onChange={(e) => setDesde(e.target.value)}
                className="cursor-pointer border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            </div>

            <div className="flex flex-col">
            <label className="text-gray-600 mb-1">Hasta:</label>
            <input
                type="datetime-local"
                value={hasta}
                onChange={(e) => setHasta(e.target.value)}
                className="cursor-pointer border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            </div>

            <button
            onClick={descargarExcel}
            className="cursor-pointer border border-green-600 text-green-600 rounded px-4 py-2 hover:bg-green-600 hover:text-white transition"
            >
            Descargar Excel
            </button>
        </div>
        </div>
    );
};

export default ReporteExcel;
