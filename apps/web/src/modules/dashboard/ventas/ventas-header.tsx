export function VentasHeader() {
  return (
    <div className="flex flex-col justify-center text-center items-center space-y-4 lg:flex-row lg:justify-between lg:text-left lg:space-y-0">
      <div>
        <h4 className="text-lg lg:text-2xl font-bold">Gestión de Ventas</h4>
        <p className="text-sm lg:text-base text-muted-foreground">
          Administra las ventas de tu empresa
        </p>
      </div>
    </div>
  );
}