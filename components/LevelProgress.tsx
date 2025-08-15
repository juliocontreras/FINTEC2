'use client';

import { useLevelStore } from '../store/levelStore';
import CollapsibleCard from './CollapsibleCard';

export default function LevelProgress() {
  const { wealth, currentLevel, levels, setWealth } = useLevelStore();

  const nextLevel = levels[currentLevel + 1];
  const currentThreshold = levels[currentLevel].minWealth;
  const nextThreshold = nextLevel ? nextLevel.minWealth : currentThreshold;
  const progress = nextLevel
    ? ((wealth - currentThreshold) / (nextThreshold - currentThreshold)) * 100
    : 100;

  const unlockedStrategies = levels
    .slice(0, currentLevel + 1)
    .flatMap((level) => level.strategies);

  return (
    <CollapsibleCard title="Progreso de nivel">
      <div className="flex flex-col gap-4 max-w-md">
        <div>
          <label className="flex flex-col">
            <span>Patrimonio actual</span>
            <input
              type="number"
              value={wealth}
              onChange={(e) => setWealth(Number(e.target.value))}
              className="border p-2 rounded"
            />
          </label>
        </div>
        <h2 className="text-xl font-bold">Nivel actual: {currentLevel + 1}</h2>
        <div className="w-full bg-gray-200 h-4 rounded">
          <div
            className="bg-green-500 h-4 rounded"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <p>{progress.toFixed(2)}% hacia el siguiente nivel</p>
        <div>
          <h3 className="font-semibold">Estrategias desbloqueadas</h3>
          <ul className="list-disc pl-5">
            {unlockedStrategies.map((s, idx) => (
              <li key={idx}>{s}</li>
            ))}
          </ul>
        </div>
      </div>
    </CollapsibleCard>
  );
}
