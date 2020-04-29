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
 
  return result;
}

function playFor(aPerformance) {
  return plays[aPerformance.playID];
}
