import { create } from 'zustand';

interface TimePoint {
  date: string;
  value: number;
}

interface State {
  salary: number;
  expenses: number;
  savings: number;
  patrimonio_simulado: TimePoint[];
  setSalary: (salary: number) => void;
  setExpenses: (expenses: number) => void;
  setSavings: (savings: number) => void;
}

const simulate = (salary: number, expenses: number, savings: number): TimePoint[] => {
  const monthly = salary - expenses + savings;
  const now = new Date();
  const points: TimePoint[] = [];
  let value = 0;
  for (let i = 0; i < 12; i++) {
    const d = new Date(now);
    d.setMonth(now.getMonth() + i + 1);
    value += monthly;
    points.push({ date: d.toISOString().slice(0, 7), value });
  }
  return points;
};

export const useStore = create<State>((set, get) => ({
  salary: 0,
  expenses: 0,
  savings: 0,
  patrimonio_simulado: simulate(0, 0, 0),
  setSalary: (salary) =>
    set({
      salary,
      patrimonio_simulado: simulate(salary, get().expenses, get().savings)
    }),
  setExpenses: (expenses) =>
    set({
      expenses,
      patrimonio_simulado: simulate(get().salary, expenses, get().savings)
    }),
  setSavings: (savings) =>
    set({
      savings,
      patrimonio_simulado: simulate(get().salary, get().expenses, savings)
    })
}));

