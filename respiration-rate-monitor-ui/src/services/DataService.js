import { fetchEventSource } from '@microsoft/fetch-event-source';

const authUrl = "http://localhost:8080/api/v1/auth/login"
const breathingDataURL = "http://localhost:8080/api/v1/breathingData"
const respirationRateURL = "http://localhost:8080/api/v1/respirationRate"

const getToken = async () => {
    var token;
    const loginPayload = {
        username: 'user',
        password: 'user123'
    }

    const response = await fetch(authUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(loginPayload)
    });

    if (response.ok) {
        token = await response.json();
    } else {
        console.log("Failed to fetch token: " + response.error)
    }

    return token.accessToken;
}

const fetchBreathingData = async (fileNo, callback) => {
    try {
        const token = await getToken();

        const response = await fetch(breathingDataURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + token
            },
            body: JSON.stringify({
                fileNo: fileNo
            })
        });

        if (response.ok) {
            var breathingData = await response.json();
            var formattedData = formatTimestamp(breathingData);

            callback(formattedData);
        } else {
            console.log("Failed to fetch breathing data: " + response.error);
        }
    } catch (error) {
        console.error("Error fetching data:", error);
    }
};

function formatTimestamp(dataset) {
    return dataset.map(data => {
        var date = new Date(data.Timestamp);
        var timestamp = formatTime(date);
        data.Timestamp = timestamp;

        return data;
    });
}

export const formatTime = (date) => {
    return getHours(date) + ":" + getMinutes(date) + ":" + getSeconds(date);
}

function getHours(date) {
    return (date.getHours() < 10 ? '0' : '') + date.getHours();
}

function getMinutes(date) {
    return (date.getMinutes() < 10 ? '0' : '') + date.getMinutes();
}

function getSeconds(date) {
    return (date.getSeconds() < 10 ? '0' : '') + date.getSeconds();
}

const fetchRespirationRate = async (fileNo, callback) => {
    const token = await getToken();

    const response = await fetch(respirationRateURL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': "Bearer " + token
        },
        body: JSON.stringify({
            fileNo: fileNo
        })
    });

    if (response.ok) {
        var respirationRate = await response.json();

        callback(respirationRate);
    } else {
        console.log("Failed to fetch respiration rate: " + response.error)
    }
}

export { getToken, fetchBreathingData, fetchRespirationRate };