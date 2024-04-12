import logo from './logo.svg';
import './App.css';
import { BreathingRateGraph } from './components/BreathingRateGraph';

function App() {
  return (
    <div className='App' style={{ position: "relative", margin: 0, width: "50vw" }}>
      {" "}
      <BreathingRateGraph />{" "}
    </div>
  )
}

export default App;
