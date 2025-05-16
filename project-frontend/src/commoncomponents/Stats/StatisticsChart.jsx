import React, { useEffect, useState } from 'react';
import { Line, Pie } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    LineElement,
    PointElement,
    LinearScale,
    CategoryScale,
    ArcElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { StatusCode } from '../../utils/commonEnum';
import {
    getMonthlyExpenseChange,
    getTopThreeAmount,
    getPrediction,
    getCategoryWiseData
} from '../../api/application';
import { useSnackbar } from '../../utils/SnackbarProvider';

ChartJS.register(
    LineElement,
    PointElement,
    LinearScale,
    CategoryScale,
    ArcElement,
    Title,
    Tooltip,
    Legend,
    ChartDataLabels
);

const StatisticsChart = ({ userId, statType }) => {
    const [chartData, setChartData] = useState(null);
    const [title, setTitle] = useState('');
    const [chartStyle, setChartStyle] = useState('line');
    const { showSnackbar } = useSnackbar();

    const getStats1Data = async () => {
        try {
            const response = await getTopThreeAmount({ id: userId?.id });
            if (response.statusCode === StatusCode.success) {
                if (response.data?.length > 0) {
                    const labels = response.data.map(item => item.date.split('T')[0]);
                    const dataPoints = response.data.map(item => parseFloat(item.amount));
                    setTitle('Top 3 Spending Days');
                    setChartData({
                        labels,
                        datasets: [{
                            label: `User Name: ${userId?.name}`,
                            data: dataPoints,
                            backgroundColor: chartStyle === 'pie'
                                ? ['#FF6384', '#36A2EB', '#FFCE56']
                                : 'rgba(75,192,192,0.6)',
                            borderColor: chartStyle === 'pie'
                                ? '#fff'
                                : 'rgba(75,192,192,1)',
                            borderWidth: 1,
                            tension: 0.4,
                        }],
                    });
                } else {
                    setChartData(null);
                }
            } else {
                // showSnackbar(response.message, "error");
            }
        } catch (error) {
            // showSnackbar("Something went wrong!", "error");
        }
    };

    const getStats2Data = async () => {
        try {
            const response = await getMonthlyExpenseChange({ id: userId?.id });
            if (response.statusCode === StatusCode.success && response.data?.length > 0) {
                const labels = response.data.map(item => item.month);
                const dataPoints = response.data.map(item => parseFloat(item.percentage_change));

                setTitle('Monthly % Change in Spending');
                setChartData({
                    labels,
                    datasets: [{
                        label: `User Name: ${userId?.name}`,
                        data: dataPoints,
                        backgroundColor: chartStyle === 'pie'
                            ? ['#FF6384', '#36A2EB', '#FFCE56', '#FF9F40']
                            : 'rgba(75,192,192,0.6)',
                        borderColor: chartStyle === 'pie'
                            ? '#fff'
                            : 'rgba(75,192,192,1)',
                        borderWidth: 1,
                        tension: 0.4,
                    }],
                });
            } else {
                setChartData(null);
                // showSnackbar('No data available for this user', 'warning');
            }
        } catch (error) {
            // showSnackbar('Failed to fetch stat2 data', 'error');
        }
    };

    const getStats3Data = async () => {
        try {
            const response = await getPrediction({ id: userId?.id });
            if (response.statusCode === StatusCode.success && response.data?.length > 0) {
                const labels = response.data.map(item => item.month);
                const data = response.data.map(item => parseFloat(item.amount));

                setTitle('Spending Prediction (Next Month)');
                setChartData({
                    labels,
                    datasets: [{
                        label: `User Name: ${userId?.name}`,
                        data,
                        backgroundColor: chartStyle === 'pie'
                            ? ['#FF6384', '#36A2EB', '#FFCE56', '#FF9F40']
                            : 'rgba(75,192,192,0.6)',
                        borderColor: chartStyle === 'pie'
                            ? '#fff'
                            : 'rgba(75,192,192,1)',
                        borderWidth: 1,
                        tension: 0.4,
                    }],
                });
            } else {
                setChartData(null);
                // showSnackbar('No prediction data found.', 'warning');
            }
        } catch (error) {
            // showSnackbar('Error fetching prediction data.', 'error');
        }
    };

    const getStats4Data = async () => {
        try {
            const response = await getCategoryWiseData();
            if (response.statusCode === StatusCode.success && response.data?.length > 0) {
                const labels = response.data.map(item => item.category_name);
                const data = response.data.map(item => parseFloat(item.total_amount));
                const backgroundColors = [
                    '#FF6384', '#36A2EB', '#FFCE56', '#FF9F40', '#4BC0C0',
                    '#9966FF', '#C9CBCF', '#FF6666', '#66CC99', '#FFCC99',
                    '#66CCCC', '#9999FF', '#CCCCFF'
                ];

                setTitle('Total Spend by Category');
                setChartData({
                    labels,
                    datasets: [{
                        label: `User ${userId?.name}`,
                        data,
                        backgroundColor: chartStyle === 'pie' ? backgroundColors : 'rgba(75,192,192,0.6)',
                        borderColor: chartStyle === 'pie' ? '#fff' : 'rgba(75,192,192,1)',
                        borderWidth: 1,
                        tension: 0.4,
                    }],
                });
            } else {
                setChartData(null);
                // showSnackbar('No category data available.', 'warning');
            }
        } catch (error) {
            // showSnackbar('Error fetching category-wise data.', 'error');
        }
    };

    useEffect(() => {
        if (!statType) return;

        if (statType === 'stat1') {
            getStats1Data();
        } else if (statType === 'stat2') {
            getStats2Data();
        } else if (statType === 'stat3') {
            getStats3Data();
        } else if (statType === 'stat4') {
            getStats4Data();
        }
    }, [userId, statType, chartStyle]);

    if (!chartData) {
        return (
            <div className="text-center mt-6 text-gray-500 text-lg">
                No Data Found For Line/Pie Chart...
            </div>
        );
    }
    
    const getXAxisLabel = (statType) => {
        switch (statType) {
            case 'stat1':
                return 'YY-MM-DD';
            case 'stat2':
                return 'YY-MM';
            case 'stat3':
                return 'Month';
            case 'stat4':
                return 'Categories';
            default:
                return 'Period';
        }
    };



    return (
        <div className="max-w-7xl mx-auto mt-10 px-6 py-10 bg-white shadow-xl rounded-2xl border border-gray-100">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
                <h3 className="text-xl sm:text-2xl font-semibold text-gray-800">{title}</h3>
                <button
                    onClick={() => setChartStyle(chartStyle === 'line' ? 'pie' : 'line')}
                    className="self-start sm:self-auto px-4 py-1 text-xs sm:text-sm font-medium bg-[#1178EE] text-white rounded-lg hover:bg-[#0f6bd1] transition duration-200"
                >
                    Switch to {chartStyle === 'line' ? 'Pie' : 'Line'} Chart
                </button>
            </div>

            <div className="overflow-x-auto">
                {chartStyle === 'line' ? (
                    <Line
                        data={chartData}
                        options={{
                            responsive: true,
                            maintainAspectRatio: false,
                            plugins: {
                                title: { display: true, text: title, font: { size: 16 } },
                                legend: { position: 'top', labels: { font: { size: 12 } } },
                            },
                            scales: {
                                y: {
                                    beginAtZero: true,
                                    title: {
                                        display: true,
                                        text: statType === 'stat2' ? 'Change (%)' : 'Expenditure (₹)',
                                        font: { size: 12 },
                                    },
                                    ticks: { font: { size: 10 } },
                                },
                                x: {
                                    title: {
                                        display: true,
                                        text: getXAxisLabel(statType),
                                        font: { size: 12 },
                                    },
                                    ticks: { font: { size: 10 } },
                                },
                            },
                        }}
                        style={{ height: '300px', width: '100%' }}
                    />
                ) : (
                    <div className="w-full" style={{ height: '300px', position: 'relative' }}>
                        <Pie
                            data={chartData}
                            options={{
                                responsive: true,
                                maintainAspectRatio: false,
                                plugins: {
                                    legend: { display: false },
                                    datalabels: {
                                        color: '#333',
                                        anchor: 'center',
                                        align: 'center',
                                        offset: 0,
                                        formatter: (value, context) => {
                                            const label = context.chart.data.labels[context.dataIndex];
                                            return `${label}:\n₹${value}`;
                                        },
                                        font: {
                                            weight: 'bold',
                                            size: 10,
                                        },
                                        clamp: true,
                                        display: 'auto',
                                    }
                                },
                                layout: { padding: 30 },
                            }}
                            plugins={[ChartDataLabels]}
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

export default StatisticsChart;