import axios from "axios";
import { setAuthToken } from "./AuthTokenService";

const authUrl = "http://localhost:8080/api/v1/auth/login"
const sse1URL = "http://localhost:8080/api/v1/breathingRateSSE1"
const sse2URL = "http://localhost:8080/api/v1/breathingRateSSE2"

const getToken = async () => {

}

const fetchData = async (sse, callback) => {
    const loginPayload = {
        username: 'user',
        password: 'user123'
    }

    try {
        var sseUrl, count = 0;

        if (sse = 1) sseUrl = sse1URL;
        else sseUrl = sse2URL;
        
        const events = new EventSource(sseUrl);

        events.onmessage = event => {
            if (count == 400) {
                events.close();

                return;
            }

            const parsedData = JSON.parse(event.data);

            console.log(parsedData);
            callback(parsedData);

            count++;
        };

        events.onerror = (error) => {
            console.error("Error occurred:", error);
            events.close();
        };
    } catch (error) {
        console.error("Error fetching data:", error);
    }

    // axios.post(authUrl, loginPayload)
    //     .then(response => {
    //         //get token from response
    //         const token = response.data.accessToken;

    //         //set JWT token to local
    //         localStorage.setItem("token", token);

    //         //set token to axios common header
    //         setAuthToken(token);

    //         axios({
    //             url: sseURL,
    //             data: {
    //                 prompt: 'json data'
    //             },
    //             headers: {
    //                 'accept': '*',
    //                 'content-type': 'application/json'
    //             },
    //             method: 'POST',
    //             onDownloadProgress: progressEvent => {
    //                 const xhr = progressEvent.event.target
    //                 const { responseText } = xhr
    //                 console.log("=====responseText======")
    //                 console.log(responseText)
    //             }
    //         }).then(({ data }) => Promise.resolve(data));
    //     })
    //     .catch(err => {
    //         console.log(err);
    //     });

    // const token = localStorage.getItem("token");
    // if (token) {
    //     setAuthToken(token);
    // }


};

export { getToken, fetchData };