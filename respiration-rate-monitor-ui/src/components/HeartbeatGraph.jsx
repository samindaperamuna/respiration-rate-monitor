import { Line } from "react-chartjs-2";
import { fetchData } from "../services/DataService";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
} from "chart.js";
import { useEffect, useRef, useState } from "react";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

export const heartBeatData = {
    labels: [],
    datasets: [
        {
            data: [],
            borderColor: "rgb(75, 192, 192)"
        }
    ]
}

export const HeartbeatGraph = () => {
    const [chart, setChart] = useState();
    const [data, setData] = useState();

    const chartReference = useRef(null);
    useEffect(() => {
        setChart(chartReference.current);
    }, [chartReference]);

    // Fetch data from the API server
    useEffect(() => {
        if (chart) {
            var count = 0;

            fetchData((parsedData) => {
                if (count == 0) {
                    var date = new Date(parsedData.timestamp);
                    var labels = [];

                    for (var i = 0; i < 40; i++) {
                        if (i % 4 == 0)
                            date.setSeconds(date.getSeconds() + 1);
                        var timestamp = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
                        labels.push(timestamp);
                    }

                    chart.data.labels = labels;
                }

                chart.data.datasets[0].data.push(parsedData.data);
                chart.update();
                console.log('Chart updated');

                count++;

                if (count == 40) count = 0;
            });
        }

        const interval = setInterval(() => {
            chart.data.labels = [];
            chart.data.datasets[0].data = [];
            chart.update();
            console.log('Chart cleared');
        }, 10000);

        return () => clearInterval(interval);
    });

    // const updateChartDelayed = (data, timeout) => {
    //     timer = setTimeout(() => {
    //         chart.data.datasets[0].data = data;
    //         chart.update();
    //     }, timeout);
    // }

    const options = {
        animations: false,
        elements: {
            point: {
                radius: 0
            }
        },
        plugins: {
            legend: {
                display: false
            },
            title: {
                display: true,
                text: 'Breathing Waveform'
            }
        },
        layout: {
            padding: 50
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Time (s)'
                },
                grid: {
                    display: true
                },
                ticks: {
                    maxTicksLimit: 10,
                    callback: function (value, index, ticks) {
                        return index % 4 === 0 ? this.getLabelForValue(value) : ''
                    },
                    font: {
                        size: 12
                    }
                }
            },
            y: {
                title: {
                    display: true,
                    text: 'Amplitude'
                },
                ticks: {
                    // callback: function (value, index, ticks) {
                    //     return (index * 0.2).toFixed(1);
                    // }
                },
                min: 0,
                max: 0.8
            }
        }
    };

    return <Line options={options} data={heartBeatData} ref={chartReference} />
}