'use client';

import FinancialInputs from '../../components/FinancialInputs';
import WealthChart from '../../components/WealthChart';
import LevelProgress from '../../components/LevelProgress';
import { useStore } from '../../store/useStore';

export default function DashboardPage() {
  const patrimonio = useStore((s) => s.patrimonio_simulado);
  const currentWealth =
    patrimonio[patrimonio.length - 1]?.value ?? 0;

  return (
    <main className="flex flex-col space-y-6 p-4 sm:p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold">Tu Dashboard Financiero</h1>
      <p className="text-sm text-gray-600">
        Patrimonio proyectado en {patrimonio.length} meses: {currentWealth.toFixed(2)}
      </p>
      <FinancialInputs />
      <WealthChart />
      <LevelProgress />
    </main>
  );
}

