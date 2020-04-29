const plays = JSON.parse('{  "hamlet": {"name": "Hamlet", "type": "tragedy"},  "as−like": {"name": "As You Like It", "type": "comedy"},  "othello": {"name": "Othello", "type": "tragedy"}  }')

var createData = function createData(invoice) {
  const statementData = {};
  statementData.customer = invoice.customer;
  statementData.performances = invoice.performances.map(enrichPerformance);

  return statementData;
}
exports.createData = createData;

function enrichPerformance(aPerformance) {
  const result = Object.assign({}, aPerformance); 
  result.play = playFor(result);
  result.volumeCredits = volumeCreditsFor(result);
 
  return result;
}

function playFor(aPerformance) {
  return plays[aPerformance.playID];
}

var volumeCreditsFor = function volumeCreditsFor(aPerformance) {
  // ボリューム特典のポイントを加算
  let result = Math.max(aPerformance.audience - 30, 0);
  // 喜劇のときは 10人につき、 さらにポイントを加算
  if ("comedy" === aPerformance.play.type) result += Math.floor(aPerformance.audience/ 5);
  return result;
}
exports.volumeCreditsFor = volumeCreditsFor;
