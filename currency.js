var usd = function usd(amount) {
  return new Intl.NumberFormat("en-US",  {style: "currency", currency: "USD",  minimumFractionDigits: 2 }).format(amount/100);
}
exports.usd = usd;