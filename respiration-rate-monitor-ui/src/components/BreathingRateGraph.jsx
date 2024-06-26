import { Line } from "react-chartjs-2";
import { fetchBreathingData, fetchRespirationRate, formatTime } from "../services/DataService";
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
import "./styles.css";

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

export const BreathingRateGraph = ({ setRespRate }) => {
    const [chart, setChart] = useState();
    const [inProgress, setInProgress] = useState(false);
    const [curTime, setCurTime] = useState(null);

    var count = useRef(0);
    var sseNo = useRef(1);

    const chartReference = useRef(null);
    useEffect(() => {
        setChart(chartReference.current);
    }, [chartReference]);

    // Fetch data from the API server
    useEffect(() => {
        if (!chart || inProgress) return;

        const callAPI = () => {
            // Breathing data
            fetchBreathingData(sseNo.current, (parsedData) => {
                // Update labels
                var labels = [];
                for (var i = 0; i < 400; i++) {
                    labels.push(parsedData[i].Timestamp);
                }

                chart.data.labels = labels;

                var date = new Date(Date.now() - 10000);
                setCurTime(formatTime(date));

                // Update chart datapoints
                const interval = setInterval(() => {
                    for (var i = 0; i < 10; i++) {
                        chart.data.datasets[0].data.push(parsedData[count.current + i].Data);
                    }

                    chart.update();

                    count.current = count.current + 10;

                    if (count.current == 400) {
                        clearInterval(interval);
                        count.current = 0;
                    };
                }, 250);
            });

            // Respiration rate
            fetchRespirationRate(sseNo.current, (respirationRate) => {
                if (respirationRate) setRespRate(respirationRate.rate);
            });

            if (sseNo.current == 1) sseNo.current = 2;
            else sseNo.current = 1;
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
    }, [chart]);

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
                    text: curTime,
                    align: 'start'
                },
                grid: {
                    display: true
                },
                ticks: {
                    maxTicksLimit: 10,
                    callback: function (value, index, ticks) {
                        // return index % 4 === 0 ? this.getLabelForValue(value) : ''
                        return ''
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
                max: 10.0
            }
        }
    };

    return (
        <>
            <Line options={options} data={breathingData} ref={chartReference} />
        </>)
}