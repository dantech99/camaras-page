export function formatCurrency(currency: string | number) {
  const num = parseFloat(currency.toString());

  if (isNaN(num)) {
    return "N/A";
  }

  return num.toLocaleString("es-CO", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 20,
  });
}
