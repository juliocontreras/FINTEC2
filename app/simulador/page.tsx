import FinancialInputs from '../../components/FinancialInputs';
import WealthChart from '../../components/WealthChart';

export default function SimuladorPage() {
  return (
    <div className="p-4 flex flex-col gap-8">
      <FinancialInputs />
      <WealthChart />
    </div>
  );
}
