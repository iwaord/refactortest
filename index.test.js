const indexJS = require('./index')

const invoices = JSON.parse('[  {  "customer": "BigCo",  "performances": [  {  "playID": "hamlet",  "audience": 55  },  {  "playID": "as−like",  "audience": 35  },  {  "playID": "othello",  "audience": 40  }  ]  }  ]')

// 料金テスト
describe('amountFor について', () => {
  var testPlayID = 'hamlet';
  var testPerformance = invoices[0].performances.filter(function(item, index){
    if (item.playID == testPlayID) return true;
  });
  it(testPlayID + 'の料金計算が一致すること', () => {
    expect(indexJS.amountFor(testPerformance[0])).toEqual(65000)
  })
})

// ポイント計算のテスト
describe('volumeCreditsFor について', () => {
  var testPlayID = 'hamlet';
  var testPerformance = invoices[0].performances.filter(function(item, index){
    if (item.playID == testPlayID) return true;
  });
  it(testPlayID + 'のポイント計算が一致すること', () => {
    expect(indexJS.volumeCreditsFor(testPerformance[0])).toEqual(25)
  })
})

// テスト
const exp = 'Statement for BigCo\n Hamlet: $650.00 (55 seats)\n As You Like It: $580.00 (35 seats)\n Othello: $500.00 (40 seats)\nAmount owed is $1,730.00\nYou earned 47 credits\n';

describe('statement について', () => {
  it('レポートが一致すること', () => {
    expect(indexJS.statement(invoices[0])).toEqual(exp)
  })
})
