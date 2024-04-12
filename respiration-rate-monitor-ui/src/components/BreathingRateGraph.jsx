import { Line } from "react-chartjs-2";
import { fetchData, getToken } from "../services/DataService";
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
import { callback } from "chart.js/helpers";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

export const breathingData = {
    labels: [],
    datasets: [
        {
            data: [],
            borderColor: "rgb(75, 192, 192)"
        }
    ]
}

getToken();

export const BreathingRateGraph = () => {
    const [chart, setChart] = useState();

    const chartReference = useRef(null);
    useEffect(() => {
        setChart(chartReference.current);
    }, [chartReference]);

    // Fetch data from the API server
    useEffect(() => {
        // Counter on react context
        var count = 0;
        var sseNo = 1;

        var token = localStorage.getItem("token");

        const callAPI = () => {
            if (chart) {
                fetchData(sseNo, (parsedData) => {
                    if (count == 0) {
                        var date = new Date(parsedData.timestamp);
                        var labels = [];

                        for (var i = 0; i < 400; i++) {
                            if (i % 40 == 0)
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

                    if (count == 400) count = 0;
                });

                if (sseNo == 1) sseNo = 2;
                else sseNo = 1;
            }
        }

        // Initial API call
        callAPI();

        const interval = setInterval(() => {
            chart.data.labels = [];
            chart.data.datasets[0].data = [];
            chart.update();
            console.log('Chart cleared');

            callAPI();
        }, 10000);

        return () => clearInterval(interval);
    });

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

    return <Line options={options} data={breathingData} ref={chartReference} />
}