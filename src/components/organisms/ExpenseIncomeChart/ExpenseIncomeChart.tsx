import { useAtom, useAtomValue } from "jotai";
import { useEffect } from "react";
import {
  categoriesAtom,
  chartDataDailyAtom,
  chartDataMonthlyAtom,
  isCumulativeDailyAtom,
  isCumulativeMonthlyAtom,
  monthAtom,
  transactionsAtom,
  yearAtom,
} from "~/utils/globalAtoms";
import { prepareChartDataDaily, prepareChartDataMontly } from "~/utils/helpers";
import {
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export default function ExpenseIncomeChart({ isYear }: { isYear?: boolean }) {
  const [chartDataDaily, setChartDataDaily] = useAtom(chartDataDailyAtom);
  const [chartDataMonthly, setChartDataMonthly] = useAtom(chartDataMonthlyAtom);
  const [isCumulativeDaily, setIsCumulativeDaily] = useAtom(
    isCumulativeDailyAtom
  );
  const [isCumulativeMonthly, setIsCumulativeMonthly] = useAtom(
    isCumulativeMonthlyAtom
  );
  const transactions = useAtomValue(transactionsAtom);
  const categories = useAtomValue(categoriesAtom);
  const month = useAtomValue(monthAtom);
  const year = useAtomValue(yearAtom);

  useEffect(() => {
    const data = prepareChartDataDaily(
      categories,
      transactions,
      year,
      month,
      isCumulativeDaily
    );
    setChartDataDaily(data);
  }, [month, year, isCumulativeDaily, transactions, categories]);

  useEffect(() => {
    const data = prepareChartDataMontly(
      categories,
      transactions,
      year,
      isCumulativeMonthly
    );
    setChartDataMonthly(data);
  }, [year, isCumulativeMonthly, transactions, categories]);

  return (
    <div className="flex h-full w-2/3 flex-col items-start justify-center p-5">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={isYear ? chartDataMonthly : chartDataDaily}>
          <Line type="monotone" dataKey="expense" stroke="#f87171" />
          <Line type="monotone" dataKey="income" stroke="#22c55e" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
