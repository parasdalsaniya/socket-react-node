import { useState } from 'react';
import './App.css';
import Socket from './Components/Socket';

function App() {

  const [loading, setLoading] = useState(true)

  return (
    <div className="App">
      <button onClick={() => setLoading(!loading)}>
        Change State
      </button>
      {loading ? <Socket /> : null}
    </div>
  );
}

export default App;
