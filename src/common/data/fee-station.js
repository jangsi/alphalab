const longPositionRoundTripTableData = [
  { id: 1, date: '05/01/2021', ticker: 'mAAPL', action: 'buy', quantity: 5, price: '$130', marketValue: '$650', grossProfit: '-', netProfit: '-$6.20 (-0.9%)' },
  { id: 2, date: '05/02/2021', ticker: 'mAAPL', action: 'sell', quantity: 5, price: '$140', marketValue: '$700', grossProfit: '$50 (7.69%)', netProfit: '$43.82 (6.7%)' },
]

const longPositionRountTripTableColumns = [
  { dataField: 'date', text: 'date'},
  { dataField: 'ticker', text: 'mAsset'},
  { dataField: 'action', text: 'action'},
  { dataField: 'quantity', text: 'quantity', classes: 'text-end'},
  { dataField: 'price', text: 'price', classes: 'text-end'},
  { dataField: 'marketValue', text: 'market value', classes: 'text-end'},
  { dataField: 'grossProfit', text: 'gross profit', classes: 'text-end'},
  { dataField: 'netProfit', text: 'net profit', classes: 'text-end'},
]

const longPositionRoundTripFeeData = [
  { id: 1, fee: 'Buy Commission', cost: '$1.95' },
  { id: 2, fee: 'Sell Commission', cost: '$2.10' },
  { id: 3, fee: 'Buy Tx', cost: '$1.00' },
  { id: 4, fee: 'Sell Tx', cost: '$1.10' },
  { id: 5, fee: 'Buy Spread', cost: '$0.00' },
  { id: 6, fee: 'Sell Spread', cost: '$0.03' },
  { id: 7, fee: 'Total:', cost: '$6.18' },
]

const longPositionRountTripFeeColumns = [
  { dataField: 'fee', text: 'Fee'},
  { dataField: 'cost', text: 'Cost', classes: 'text-end'},
]

export {
  longPositionRoundTripTableData,
  longPositionRountTripTableColumns,
  longPositionRoundTripFeeData,
  longPositionRountTripFeeColumns
}
