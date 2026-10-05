import React from 'react';
import ReactApexChart from 'react-apexcharts';

const TodoGrafico = ({ tarefas = [] }) => {
  
    const pendentes = tarefas.filter(t => t.situacao === "PENDENTE" || !t.situacao).length;
    const emAndamento = tarefas.filter(t => t.situacao === "EM_ANDAMENTO").length;
    const concluidas = tarefas.filter(t => t.situacao === "CONCLUIDA").length;

    const series = [pendentes, emAndamento, concluidas];

    const options = {
      chart: {
        type: 'donut',
        width: 420,
      },
      labels: [
        'Pendentes',
        'Em andamento',
        'Concluidas',
      ],
      colors: ['#6B7280', '#EAB308', '#22C55E'],
      plotOptions: {
        pie: {
          // Round the corners of every slice (px)
          borderRadius: 12,
          // Leave a gap between adjacent slices (px)
          spacing: 5,
          donut: {
            size: '68%',
            labels: {
              show: true,
              total: {
                show: true,
                label: 'Total de Tarefas',
              },
            },
          },
        },
      },
      stroke: {
        width: 0,
      },
      dataLabels: {
        enabled: false,
      },
      legend: {
        position: 'bottom',
      },
      title: {
        text: 'Resumo das atividades',
        align: 'left',
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 320,
            },
          },
        },
      ],
    };
  
    //se não tiver tarefa não gera o gráfico
    if(tarefas.length === 0){
        return (
            <div className='p-8 text-center text-gray-500 border border-gray-200 rounded-xl bg-white'>
                Nenhuma tarefa encontrada para gerar o gráfico.
            </div>
        );
    }

  return (
    <div className='flex justify-center bg-white p-4 rounded-xl border border-gray-200'>
      <div id="chart">
        <ReactApexChart
          options={options}
          series={series}
          type="donut"
          width={420}
        />
      </div>
    </div>
  );
};

export default TodoGrafico;
