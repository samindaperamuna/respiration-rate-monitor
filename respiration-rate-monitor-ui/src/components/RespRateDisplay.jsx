import { render } from "@testing-library/react";
import { useEffect, useState } from "react";


export const RespRateDisplay = ({ respRateIn }) => {
    const [respRate, setRespRate] = useState(respRateIn);

    useEffect(() => {
        setRespRate(respRateIn);
    }, [respRateIn])

    const onChange = (event) => {
        setRespRate(event.target.value);
    }

    var respNotification;
    if (respRate < 10) {
        respNotification = <div>
            <span className="respRateAlert">Very Low: </span>
            <span>Breathe normally. If your respiration continues to be low, please see a doctor</span>
        </div>
    } else if (respRate > 22) {
        respNotification = <div>
            <span className="respRateAlert">Very High: </span>
            <span>Inhale Deeply. If your respiration continues to be high, please see a doctor</span>
        </div>
    } else {
        respNotification = <div>
            <span>Normal: </span>
            <span>Inhale Deeply. And continue to relax</span>
        </div>
    }

    return (
        <>
            <div id="respRateContainer">
                <span>Respiration rate : &nbsp;&nbsp;</span>
                <input name="respRate" type="text" className="respRate" onChange={onChange} value={respRate} />&nbsp;&nbsp; breaths per minute
            </div>
            <div id="respRateNotification">
                {respNotification}
            </div>
        </>
    )
}