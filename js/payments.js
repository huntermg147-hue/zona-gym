export function applyPaymentToPending(record, amount, method, date) {
  const paid = Number((Number(record.paid || 0) + amount).toFixed(2));
  const balance = Number((Number(record.total || 0) - paid).toFixed(2));
  const paymentHistory = Array.isArray(record.paymentHistory) ? [...record.paymentHistory] : [];
  paymentHistory.push({ amount, method, date });
  return { ...record, paid, balance: Math.max(balance, 0), paymentHistory };
}

export function shouldMoveToActive(record) {
  return Number(record.balance || 0) <= 0;
}
