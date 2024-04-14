import logo from './logo.svg';
import './App.css';
import { BreathingRateGraph } from './components/BreathingRateGraph';
import { RespRateDisplay } from './components/RespRateDisplay';
import { useState } from 'react';

function App() {
  const [respRate, setRespRate] = useState(0);

  return (
    <div className='App' style={{ position: "relative", margin: 0, width: "50vw" }}>
      <BreathingRateGraph setRespRate={setRespRate} />
      <RespRateDisplay respRateIn={respRate} />
    </div>
  )
}

export default App;
