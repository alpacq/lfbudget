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
import { Line, LineChart } from "recharts";

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
    console.log("daily");
    setChartDataDaily(data);
  }, [month, year, isCumulativeDaily, transactions, categories]);

  useEffect(() => {
    const data = prepareChartDataMontly(
      categories,
      transactions,
      year,
      isCumulativeMonthly
    );
    console.log("monthly");
    setChartDataMonthly(data);
  }, [year, isCumulativeMonthly, transactions, categories]);

  return (
    <div className="flex flex-col items-start justify-center">
      <LineChart
        width={400}
        height={400}
        data={isYear ? chartDataMonthly : chartDataDaily}
      >
        <Line type="monotone" dataKey="expense" stroke="#8884d8" />
      </LineChart>
    </div>
  );
}
