import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';

Chart.register(ArcElement, Tooltip, Legend);

    type PedidoPorInstrumento = {
        nombreInstrumento: string;
        cantidad: number;
    };

    export const PieChartPedidosInstrumento: React.FC = () => {
    const [dataResumen, setDataResumen] = useState<PedidoPorInstrumento[]>([]);

    useEffect(() => {
        console.log("OBTENIENDO RESUMEN DE PEDIDOS POR INSTRUMENTO")
        fetch('http://localhost:8080/pedido/resumen-pie')
        .then(res => {
            if (!res.ok) throw new Error('Error al obtener datos del backend');
            return res.json();
        })
        .then((data: PedidoPorInstrumento[]) => setDataResumen(data))
        .catch(console.error);
    }, []);

    const labels = dataResumen.map(d => d.nombreInstrumento);
    const cantidades = dataResumen.map(d => d.cantidad);

    const pieChartData = {
        labels,
        datasets: [
        {
            label: 'Cantidad de pedidos por instrumento',
            data: cantidades,
            backgroundColor: [
            '#FF6384',
            '#36A2EB',
            '#FFCE56',
            '#4BC0C0',
            '#9966FF',
            '#FF9F40',
            '#C9CBCF',
            ],
            borderWidth: 1,
        },
        ],
    };

    return (
        <div className='w-100 flex flex-col gap-4'>
        <h3 className='text-center'>Pedidos por Instrumento</h3>
        <Pie data={pieChartData} />
        </div>
    );
};

