import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@camaras/ui/src/components/tabs";
import { GeneralPackageChart } from "./general-package-chart";
import { GeneralMoneyChart } from "./general-money-chart";

export const TabMetrics = () => {
  return (
    <Tabs defaultValue="generalPackages" className="">
      <TabsList className="w-fit">
        <TabsTrigger value="generalPackages" className="px-4">
          Paquetes
        </TabsTrigger>
        <TabsTrigger value="generalMoney" className="px-4">
          Dinero
        </TabsTrigger>
      </TabsList>
      <TabsContent value="generalPackages">
        <GeneralPackageChart />
      </TabsContent>
      <TabsContent value="generalMoney">
        <GeneralMoneyChart />
      </TabsContent>
    </Tabs>
  );
};
