import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@camaras/ui/src/components/tabs";
import { GeneralPackageChart } from "./general-package-chart";

export const TabMetrics = () => {
  return (
    <Tabs defaultValue="account" className="">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="generalPackages">Paquetes</TabsTrigger>
        <TabsTrigger value="generalMoney">Dinero</TabsTrigger>
      </TabsList>
      <TabsContent value="generalPackages">
        <GeneralPackageChart />
      </TabsContent>
      <TabsContent value="generalMoney">
        
      </TabsContent>
    </Tabs>
  );
};
