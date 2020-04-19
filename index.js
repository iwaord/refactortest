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
  let volumeCredits = 0;
  // ボリューム特典のポイントを加算
  volumeCredits += Math.max(perf.audience - 30, 0);
  // 喜劇のときは 10人につき、 さらにポイントを加算
  if ("comedy" === play.type) volumeCredits += Math.floor(perf.audience/ 5);
  return volumeCredits;
}
exports.volumeCreditsFor = volumeCreditsFor;

exports.statement = function statement (invoice, plays) {
  let totalAmount = 0;
  let volumeCredits = 0;
  let result = `Statement for ${invoice.customer}\n`;

  const format = new Intl.NumberFormat("en-US",  {style: "currency", currency: "USD",  minimumFractionDigits: 2 }).format;

  for (let perf of invoice.performances) { 
    const play = plays[perf.playID];

    volumeCredits += volumeCreditsFor(play, perf);

    // 注文の内訳を出力
    result += ` ${play.name}: ${format(amountFor(play, perf)/100)} (${perf.audience} seats)\n`;

    totalAmount += amountFor(play, perf);
  }

  result += `Amount owed is ${format(totalAmount/100)}\n`;
  result += `You earned ${volumeCredits} credits\n`;

  return result;
} 
