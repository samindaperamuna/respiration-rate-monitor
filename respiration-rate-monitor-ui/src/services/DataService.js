import axios from "axios";

const fetchData = async (callback) => {
    try {
        const events = new EventSource("http://localhost:8080/api/v1/breathingRateSSE");

        events.onmessage = event => {
            const parsedData = JSON.parse(event.data);

            // var date = new Date(parsedData.timestamp);
            // var timestamp = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
            // var data = parsedData.data

            // var record = { timestamp: timestamp, data: data };

            console.log(parsedData);
            callback(parsedData);
        };

        events.onerror = (error) => {
            console.error("Error occurred:", error);
            events.close();
        };

        //     axios({
        //         url: 'http://localhost:8080/api/v1/heartbeatSSE',
        //         data: [],
        //         headers: {
        //             'accept': '*',
        //             'content-type': 'application/json'
        //         },
        //         method: 'GET',
        //         responseType: 'json',
        //         onDownloadProgress: progressEvent => {
        //             const xhr = progressEvent.event.target;
        //             const { responseText } = xhr;

        //             console.log(responseText);

        //             callback(JSON.parse(responseText));
        //         }
        //     }).then(({ data }) => Promise.resolve(data));
    } catch (error) {
        console.error("Error fetching data:", error);
    }
};

export { fetchData };

// import HeartBeatData from '../data.json';

// const timestamps = HeartBeatData.map(data => {
//     var date = new Date(data.Timestamp);

//     return date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
// });
// const data = HeartBeatData.map(data => data.Data);

// export const heartBeatData = {
//     labels: timestamps,
//     datasets: [
//         {
//             data: data,
//             borderColor: "rgb(75, 192, 192)"
//         }
//     ]
// }