const indexJS = require('./index')

const plays = JSON.parse('{  "hamlet": {"name": "Hamlet", "type": "tragedy"},  "as−like": {"name": "As You Like It", "type": "comedy"},  "othello": {"name": "Othello", "type": "tragedy"}  }')

const invoices = JSON.parse('[  {  "customer": "BigCo",  "performances": [  {  "playID": "hamlet",  "audience": 55  },  {  "playID": "as−like",  "audience": 35  },  {  "playID": "othello",  "audience": 40  }  ]  }  ]')

// 料金テスト
describe('amountFor について', () => {
  it('hamletの料金計算が一致すること', () => {
    expect(indexJS.amountFor(plays[invoices[0].performances[0].playID], invoices[0].performances[0])).toEqual(65000)
  })
})

// テスト
const exp = 'Statement for BigCo\n Hamlet: $650.00 (55 seats)\n As You Like It: $580.00 (35 seats)\n Othello: $500.00 (40 seats)\nAmount owed is $1,730.00\nYou earned 47 credits\n';

describe('statement について', () => {
  it('レポートが一致すること', () => {
    expect(indexJS.statement(invoices[0], plays)).toEqual(exp)
  })
})
