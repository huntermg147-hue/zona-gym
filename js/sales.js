export function calcSaleTotal(units, unitPrice) {
  return (Math.max(Number(units) || 0, 0) * Math.max(Number(unitPrice) || 0, 0));
}

export function createSaleRecord({ id, product, units, unitPrice, method, date }) {
  return {
    id,
    product,
    units: Number(units),
    unitPrice: Number(unitPrice),
    final: calcSaleTotal(units, unitPrice),
    method,
    date,
    inventoryReady: true
  };
}
