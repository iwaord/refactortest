// 料金を計算する
var amountFor = function amountFor(play, aPerformance) {
　let result =0;

  switch (play.type) {
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
      throw new Error(`unknown type: ${play.type}`);
  }
  return result;
}
exports.amountFor = amountFor;

var volumeCreditsFor = function volumeCreditsFor(play, perf) {
  let result = 0;
  // ボリューム特典のポイントを加算
  result += Math.max(perf.audience - 30, 0);
  // 喜劇のときは 10人につき、 さらにポイントを加算
  if ("comedy" === play.type) result += Math.floor(perf.audience/ 5);
  return result;
}
exports.volumeCreditsFor = volumeCreditsFor;

function usd(amount) {
  return new Intl.NumberFormat("en-US",  {style: "currency", currency: "USD",  minimumFractionDigits: 2 }).format(amount/100);
}

exports.statement = function statement (invoice, plays) {
  let totalAmount = 0;
  let volumeCredits = 0;
  let result = `Statement for ${invoice.customer}\n`;

  for (let perf of invoice.performances) { 
 
    volumeCredits += volumeCreditsFor(plays[perf.playID], perf);

    // 注文の内訳を出力
    result += ` ${plays[perf.playID].name}: ${usd(amountFor(plays[perf.playID], perf))} (${perf.audience} seats)\n`;

    totalAmount += amountFor(plays[perf.playID], perf);
  }

  result += `Amount owed is ${usd(totalAmount)}\n`;
  result += `You earned ${volumeCredits} credits\n`;

  return result;
} 
