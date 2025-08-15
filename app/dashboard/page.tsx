'use client';

import Link from 'next/link';
import FinancialInputs from '../../components/FinancialInputs';
import WealthChart from '../../components/WealthChart';
import LevelProgress from '../../components/LevelProgress';
import { useStore } from '../../store/useStore';
import { useLevelStore } from '../../store/levelStore';
import { useTheme } from '../../lib/useTheme';

export default function DashboardPage() {
  const { theme, toggleTheme } = useTheme();
  const patrimonio = useStore((s) => s.patrimonio_simulado);
  const currentWealth = patrimonio[0]?.value ?? 0;
  const projection12 = patrimonio[patrimonio.length - 1]?.value ?? 0;

  const { wealth, currentLevel, levels } = useLevelStore();
  const nextLevel = levels[currentLevel + 1];
  const currentThreshold = levels[currentLevel].minWealth;
  const nextThreshold = nextLevel ? nextLevel.minWealth : currentThreshold;
  const progress = nextLevel
    ? ((wealth - currentThreshold) / (nextThreshold - currentThreshold)) * 100
    : 100;

  return (
    <main className="min-h-screen bg-gray-100 text-gray-900 dark:bg-zinc-950 dark:text-gray-100 max-w-5xl mx-auto space-y-6 p-6">
      <div className="relative flex items-start justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold">Camino a los 100K€</h1>
          <p className="text-muted-foreground">
            Tu evolución financiera guiada paso a paso
          </p>
        </div>
        <button
          onClick={toggleTheme}
          className="absolute right-0 top-0 rounded border border-gray-200 bg-white p-2 dark:border-zinc-700 dark:bg-zinc-900"
          aria-label="Cambiar tema"
        >
          {theme === 'dark' ? '☀️' : '🌙'}
        </button>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <div className="p-4 rounded border bg-white text-gray-900 dark:bg-zinc-900 dark:text-gray-100 dark:border-zinc-700">
          <h3 className="text-sm font-medium">Patrimonio actual</h3>
          <p className="mt-2 text-2xl font-bold">{currentWealth.toFixed(2)} €</p>
        </div>
        <div className="p-4 rounded border bg-white text-gray-900 dark:bg-zinc-900 dark:text-gray-100 dark:border-zinc-700">
          <h3 className="text-sm font-medium">Proyección a 12 meses</h3>
          <p className="mt-2 text-2xl font-bold text-green-600">
            {projection12.toFixed(2)} €
          </p>
        </div>
        <div className="p-4 rounded border bg-white text-gray-900 dark:bg-zinc-900 dark:text-gray-100 dark:border-zinc-700">
          <h3 className="text-sm font-medium mb-2">Nivel actual: {currentLevel + 1}</h3>
          <div className="w-full h-3 bg-gray-200 rounded dark:bg-zinc-700">
            <div
              className="h-3 bg-green-500 rounded"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
      </div>

      <FinancialInputs />
      <WealthChart />
      <LevelProgress />

      <Link
        href="/simulador"
        className="block w-full text-center rounded-md border border-gray-200 bg-gray-100 py-3 text-gray-900 dark:border-zinc-700 dark:bg-zinc-900 dark:text-gray-100"
      >
        Ir al simulador de escenarios
      </Link>

      <section className="mt-6">
        <h2 className="mb-4 text-xl font-semibold">Vista HTML integrada</h2>
        <iframe
          src="/legacy-dashboard.html"
          className="w-full h-96 rounded border"
          title="Dashboard HTML"
        />
      </section>
    </main>
  );
}
