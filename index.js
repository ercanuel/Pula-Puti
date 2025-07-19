import { useState } from 'react';

export default function Home() {
  const [history, setHistory] = useState([]);
  const [prediction, setPrediction] = useState('');
  const [newColor, setNewColor] = useState('');
  const [jackpotPattern, setJackpotPattern] = useState('');

  const updateHistory = () => {
    if (newColor.trim().length === 0) return;
    const updatedHistory = [...history, newColor.trim()];
    setHistory(updatedHistory);
    setNewColor('');
    makePrediction(updatedHistory);
    detectJackpot(updatedHistory);
  };

  const makePrediction = (data) => {
    const counts = data.reduce((acc, color) => {
      acc[color] = (acc[color] || 0) + 1;
      return acc;
    }, {});
    const colors = ['Red', 'White'];
    colors.forEach((color) => {
      if (!counts[color]) counts[color] = 0;
    });
    const prediction = Object.entries(counts).reduce((minColor, current) => {
      return current[1] < counts[minColor[0]] ? current : minColor;
    })[0];
    setPrediction(prediction);
  };

  const detectJackpot = (data) => {
    if (data.length < 3) {
      setJackpotPattern('');
      return;
    }
    const lastThree = data.slice(-3);
    if (lastThree.every((color) => color === lastThree[0])) {
      setJackpotPattern(`🔥 Jackpot Pattern Detected: 3 consecutive ${lastThree[0]}s!`);
    } else {
      setJackpotPattern('');
    }
  };

  return (
    <div className="min-h-screen bg-white text-black p-4 max-w-md mx-auto space-y-4">
      <h1 className="text-2xl font-bold text-center">🎯 Color Game Predictor</h1>

      <div className="space-y-2">
        <p className="text-sm">Enter recent result (Red or White):</p>
        <div className="flex gap-2">
          <input
            type="text"
            value={newColor}
            onChange={(e) => setNewColor(e.target.value)}
            placeholder="Red or White"
            className="border rounded px-2 py-1 flex-1"
          />
          <button onClick={updateHistory} className="bg-blue-500 text-white px-4 py-1 rounded">
            Add
          </button>
        </div>
      </div>

      <div className="border rounded p-2">
        <p className="text-sm">History:</p>
        <p>{history.join(', ') || 'No data yet'}</p>
      </div>

      <div className="border rounded p-2">
        <p className="text-sm">Predicted Next Color:</p>
        <p className="text-lg font-bold">{prediction || 'N/A'}</p>
      </div>

      {jackpotPattern && (
        <div className="bg-yellow-100 border border-yellow-300 rounded p-2 text-yellow-800 font-semibold">
          {jackpotPattern}
        </div>
      )}
    </div>
  );
}
