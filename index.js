const currency = require('./currency');

var amountFor = function amountFor(aPerformance) {
　let result =0;

  switch (aPerformance.play.type) {
    case "tragedy":
      result = 40000;
      if (aPerformance.audience > 30) {
        result += 1000 * (aPerformance.audience - 30);
      }
      break;
    case "comedy":
      result = 30000;
      if (aPerformance.audience > 20) {
        result += 10000 + 500 * (aPerformance.audience - 20);
      }
      result += 300 * aPerformance.audience;
      break;
    default:
      throw new Error(`unknown type: ${aPerformance.play.type}`);
  }
  return result;
}
exports.amountFor = amountFor;

function totalVolumeCreditsFor(invoice) {
  let result = 0;
  for (let perf of invoice.performances) { 
    result += perf.volumeCredits;
  }
  return result;
}

function totalAmountFor(invoice) {
  let result = 0;
  for (let perf of invoice.performances) { 
    result += amountFor(perf);
  }
  return result;
}

var renderingPlainText = function renderingPlainText(invoice) {
  let result = `Statement for ${invoice.customer}\n`;
  for (let perf of invoice.performances) { 
    // 注文の内訳を出力
    result += ` ${perf.play.name}: ${currency.usd(amountFor(perf))} (${perf.audience} seats)\n`;
  }

  result += `Amount owed is ${currency.usd(totalAmountFor(invoice))}\n`;
  result += `You earned ${totalVolumeCreditsFor(invoice)} credits\n`;

  return result;
}
exports.renderingPlainText = renderingPlainText;
