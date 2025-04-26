export function formatCurrency(currency: string) {
  const num = parseFloat(currency);

  if (isNaN(num)) {
    return "N/A";
  }

  return num.toLocaleString("es-CO", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 20,
  });
}
