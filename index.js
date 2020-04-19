const plays = JSON.parse('{  "hamlet": {"name": "Hamlet", "type": "tragedy"},  "as−like": {"name": "As You Like It", "type": "comedy"},  "othello": {"name": "Othello", "type": "tragedy"}  }')

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

function totalVolumeCreditsFor(invoice) {
  let result = 0;
  for (let perf of invoice.performances) { 
    result += volumeCreditsFor(playFor(perf), perf);
  }
  return result;
}

function totalAmountFor(invoice) {
  let result = 0;
  for (let perf of invoice.performances) { 
    result += amountFor(playFor(perf), perf);
  }
  return result;
}

var playFor = function playFor(aPerformance) {
  return plays[aPerformance.playID];
}
exports.playFor = playFor;

exports.statement = function statement (invoice) {
  let result = `Statement for ${invoice.customer}\n`;
  for (let perf of invoice.performances) { 
    // 注文の内訳を出力
    result += ` ${playFor(perf).name}: ${usd(amountFor(playFor(perf), perf))} (${perf.audience} seats)\n`;
  }

  result += `Amount owed is ${usd(totalAmountFor(invoice))}\n`;
  result += `You earned ${totalVolumeCreditsFor(invoice)} credits\n`;

  return result;
} 
