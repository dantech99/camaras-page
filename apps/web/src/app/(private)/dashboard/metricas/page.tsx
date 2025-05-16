import { PackageGraphChart } from "@/modules/dashboard/metricas/package-graph-chart";
import { MoneyGraphChart } from "@/modules/dashboard/metricas/money-graph-chart";

export default function MetricasPage() {
  return (
    <div className="grid grid-cols-3 md:grid-cols-12 grid-rows-6 md:grid-rows-3 gap-2 md:gap-1 m-4">
      <div className="col-start-1 row-start-1 col-span-3 row-span-2 md:col-start-1 md:row-start-1 md:col-span-4 md:row-span-3 rounded-md p-10">
        <PackageGraphChart />
      </div>
      <div className="col-start-1 row-start-3 col-span-3 row-span-2 md:col-start-5 md:row-start-1 md:col-span-4 md:row-span-3 rounded-md p-10">
        <MoneyGraphChart />
      </div>
      <div className="col-start-1 row-start-5 col-span-3 row-span-2 md:col-start-9 md:row-start-1 md:col-span-4 md:row-span-3 rounded-md p-10">
        <PackageGraphChart />
      </div>
    </div>
  );
}
