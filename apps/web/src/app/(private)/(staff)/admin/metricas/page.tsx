import { MoneyGeneralChart } from "@/modules/dashboard/admin/metricas/money-general-chart";
import { ScheduleChart } from "@/modules/dashboard/admin/metricas/schedule-chart";
import { TopRatedPhotographerChart } from "@/modules/dashboard/admin/metricas/topRated-photographer-chart";
import { TopSellingPhotographerChart } from "@/modules/dashboard/admin/metricas/topSelling-photographer-chart";
import { TotalCustomerChart } from "@/modules/dashboard/admin/metricas/total-customers-chart";
import { TotalUsersPageChart } from "@/modules/dashboard/admin/metricas/total-users-page";

export default function Page() {
  return (
    <div className="px-4 py-2 space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-4">
        <TopSellingPhotographerChart />
        <TopRatedPhotographerChart />
        <MoneyGeneralChart />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-4">
        <TotalCustomerChart />
        <TotalUsersPageChart />
      </div>
      <ScheduleChart />
    </div>
  );
}
