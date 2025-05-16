import { PackageGraphChart } from "@/modules/dashboard/metricas/package-graph-chart";
import { MoneyGraphChart } from "@/modules/dashboard/metricas/money-graph-chart";
import { ScheduleChart } from "@/modules/dashboard/metricas/schedule-chart";
import { TabMetrics } from "@/modules/dashboard/metricas/tab-metrics";

export default function MetricasPage() {
  return (
    <>
      <div className="grid grid-cols-6 md:grid-cols-12 grid-rows-4 md:grid-rows-2 gap-2 md:gap-2 p-3">
        <div className="col-start-1 row-start-1 col-span-6 md:col-start-1 md:row-start-1 md:col-span-4 md:row-span-1 rounded-md p-4">
          <PackageGraphChart />
        </div>
        <div className="col-start-1 row-start-2 col-span-6 md:col-start-5 md:row-start-1 md:col-span-4 md:row-span-1 rounded-md p-4">
          <MoneyGraphChart />
        </div>
        <div className="col-start-1 row-start-3 col-span-6 md:col-start-9 md:row-start-1 md:col-span-4 md:row-span-1 rounded-md p-4">
          <PackageGraphChart /> // Acá va otro gráfico
        </div>
        <div className="col-start-1 row-start-4 col-span-6 md:col-start-1 md:row-start-2 md:col-span-12 md:row-span-1 rounded-md p-4">
          <ScheduleChart />
        </div>
      </div>

      <div className="px-4 py-2">
        <TabMetrics />
      </div>
    </>
  );
}
