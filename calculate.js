const plays = JSON.parse('{  "hamlet": {"name": "Hamlet", "type": "tragedy"},  "as−like": {"name": "As You Like It", "type": "comedy"},  "othello": {"name": "Othello", "type": "tragedy"}  }')

var playFor = function playFor(aPerformance) {
  return plays[aPerformance.playID];
}
exports.playFor = playFor;
