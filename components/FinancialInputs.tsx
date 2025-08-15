'use client';

import { useStore } from '../store/useStore';
import CollapsibleCard from './CollapsibleCard';

export default function FinancialInputs() {
  const { salary, expenses, savings, setSalary, setExpenses, setSavings } = useStore();

  return (
    <CollapsibleCard title="Datos financieros">
      <div className="flex flex-col gap-4">
        <label className="flex flex-col">
          <span>Salario mensual</span>
          <input
            type="number"
            value={salary}
            onChange={(e) => setSalary(Number(e.target.value))}
            className="border p-2 rounded"
          />
        </label>
        <label className="flex flex-col">
          <span>Gastos mensuales</span>
          <input
            type="number"
            value={expenses}
            onChange={(e) => setExpenses(Number(e.target.value))}
            className="border p-2 rounded"
          />
        </label>
        <label className="flex flex-col">
          <span>Ahorro mensual</span>
          <input
            type="number"
            value={savings}
            onChange={(e) => setSavings(Number(e.target.value))}
            className="border p-2 rounded"
          />
        </label>
      </div>
    </CollapsibleCard>
  );
}

