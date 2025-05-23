import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';

Chart.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

type PedidoResumen = {
    mesAnio: string;
    cantidad: number;
};

export const BarChartPedidos: React.FC = () => {
    const [dataResumen, setDataResumen] = useState<PedidoResumen[]>([]);

    useEffect(() => {
        console.log("OBTENIENDO RESUMEN DE PEDIDOS MES Y AÑO")

        fetch('http://localhost:8080/pedido/resumen-barras')
        .then(res => {
            if (!res.ok) {
            throw new Error('Error al obtener los datos del backend');
            }
            return res.json();
        })
        .then((data: PedidoResumen[]) => {
            setDataResumen(data);
        })
        .catch(error => {
            console.error('Error cargando los datos:', error);
        });
    }, []);

    const cantidades = dataResumen.map(item => item.cantidad);

    const nombresMeses = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
    ];

    const labelsConNombreMes = dataResumen.map(({ mesAnio }) => {
    const [mes, anio] = mesAnio.split('-');
    const mesNumero = parseInt(mes, 10);
    const nombreMes = nombresMeses[mesNumero - 1] || mes;
    return `${nombreMes} ${anio}`;
    });

    const barChartData = {
    labels: labelsConNombreMes,
    datasets: [
        {
            label: 'Cantidad de pedidos',
            data: cantidades,
            backgroundColor: 'rgba(75, 192, 192, 0.7)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
        },
    ],
};

    return (
        <div className='w-100 flex flex-col gap-4'>
            <h3 className='text-center'>Pedidos por Mes y Año</h3>
            <Bar data={barChartData} />
        </div>
    );
};
