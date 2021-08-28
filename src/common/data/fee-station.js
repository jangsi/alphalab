const longPositionRoundTripTableData = [
  { id: 1, date: '05/01/2021', ticker: 'mAAPL', action: 'buy', quantity: 5, price: '$130', marketValue: '$650', grossProfit: '-', netProfit: '-$6.20 (-0.9%)' },
  { id: 2, date: '05/02/2021', ticker: 'mAAPL', action: 'sell', quantity: 5, price: '$140', marketValue: '$700', grossProfit: '$50 (7.69%)', netProfit: '$43.82 (6.7%)' },
]

const longPositionRountTripTableColumns = [
  { dataField: 'date', text: 'date'},
  { dataField: 'ticker', text: 'mAsset'},
  { dataField: 'action', text: 'action'},
  { dataField: 'quantity', text: 'quantity', align: 'right', headerAlign: 'right'},
  { dataField: 'price', text: 'price', align: 'right', headerAlign: 'right'},
  { dataField: 'marketValue', text: 'market value', align: 'right', headerAlign: 'right'},
  { dataField: 'grossProfit', text: 'gross profit', align: 'right', headerAlign: 'right'},
  { dataField: 'netProfit', text: 'net profit', align: 'right', headerAlign: 'right'},
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
  { dataField: 'cost', text: 'Cost', align: 'right', headerAlign: 'right'},
]

const largePoolFeeData = {
  commission: [
    { x: '2', y: 0.006 },
    { x: '20', y: 0.06 },
    { x: '200', y: 0.6 },
    { x: '2000', y: 6 },
    { x: '20000', y: 60 },
    { x: '200000', y: 600 },
  ],
  tx: [
    { x: '2', y: 0.11 },
    { x: '20', y: 0.18 },
    { x: '200', y: 0.91 },
    { x: '2000', y: 1.53 },
    { x: '20000', y: 1.53 },
    { x: '200000', y: 1.53 },
  ],
  spread: [
    { x: '2', y: 0 },
    { x: '20', y: 0 },
    { x: '200', y: 0.000019 },
    { x: '2000', y: 0.0001934 },
    { x: '20000', y: 0.1934 },
    { x: '200000', y: 19.169297 },
  ]
}

const largePoolPercentData = {
  commission: [
    { x: '2', y: 0.3 },
    { x: '20', y: 0.3 },
    { x: '200', y: 0.3 },
    { x: '2000', y: 0.3 },
    { x: '20000', y: 0.3 },
    { x: '200000', y: 0.3 },
  ],
  tx: [
    { x: '2', y: 5.5 },
    { x: '20', y: 0.9 },
    { x: '200', y: 0.455 },
    { x: '2000', y: 0.0765 },
    { x: '20000', y: 0.00765 },
    { x: '200000', y: 0.000765 },
  ],
  spread: [
    { x: '2', y: 0 },
    { x: '20', y: 0 },
    { x: '200', y: 0 },
    { x: '2000', y: 0 },
    { x: '20000', y: 0 },
    { x: '200000', y: 0.0096 },
  ]
}

const smallPoolFeeData = {
  commission: [
    { x: '2', y: 0.006 },
    { x: '20', y: 0.06 },
    { x: '200', y: 0.6 },
    { x: '2000', y: 6 },
    { x: '20000', y: 60 },
    { x: '200000', y: 600 },
  ],
  tx: [
    { x: '2', y: 0.11 },
    { x: '20', y: 0.18 },
    { x: '200', y: 0.91 },
    { x: '2000', y: 1.53 },
    { x: '20000', y: 1.53 },
    { x: '200000', y: 1.53 },
  ],
  spread: [
    { x: '2', y: 0 },
    { x: '20', y: 0.000006 },
    { x: '200', y: 0.000713 },
    { x: '2000', y: 0.071351 },
    { x: '20000', y: 7.092173 },
    { x: '200000', y: 668.701351 },
  ]
}

const chartOptions = {
  chart: { toolbar: "false" },
  dataLabels: { enabled: !1 },
  stroke: { curve: "smooth", width: 2 },
  markers: { size: 0, style: "hollow" },
  xaxis: {
    type: "category",
    forceNiceScale: true,
    tickPlacement: 'on'
  },
  yaxis: {
    forceNiceScale: true,
  },
  colors: ["#3499ff", "#e53efc", "#f1b44c"],
  fill: {
    type: "gradient",
    gradient: {
      shadeIntensity: 1,
      opacityFrom: 0.6,
      opacityTo: 0.05,
      stops: [42, 100, 100, 100],
    },
  },
  noData: {
    text: 'Loading...'
  },
}

const shortPositionRoundTripTableData = [
  { id: 1, date: '05/01/2021', ticker: 'aUST', action: 'deposit (mint)', quantity: 1300, price: '$1', marketValue: '$1300', grossProfit: '-', netProfit: '-$1.68 (-0.13%)' },
  { id: 2, date: '05/01/2021', ticker: 'mSPY', action: 'short farm (180% collateral 1298.33aUST)', quantity: 1.6845, price: '$431.84', marketValue: '-$727.43', grossProfit: '-', netProfit: '-$3.26 (-0.25%)' },
  { id: 3, date: '06/01/2021', ticker: 'mSPY', action: 'buy to cover', quantity: '*1.69795', price: '$397.33', marketValue: '$674.64', grossProfit: '$52.79', netProfit: '$91.90 (7.07%)' },
  { id: 4, date: '06/01/2021', ticker: 'mSPY', action: 'close short farm (burn)', quantity: '1.6845', price: '-', marketValue: '-', grossProfit: '$52.79', netProfit: '$80.25 (6.17%)' },
]

const shortPositionRountTripTableColumns = [
  { dataField: 'date', text: 'date'},
  { dataField: 'ticker', text: 'mAsset'},
  { dataField: 'action', text: 'action'},
  { dataField: 'quantity', text: 'quantity', align: 'right', headerAlign: 'right'},
  { dataField: 'price', text: 'price', align: 'right', headerAlign: 'right'},
  { dataField: 'marketValue', text: 'market value', align: 'right', headerAlign: 'right'},
  { dataField: 'grossProfit', text: 'gross profit', align: 'right', headerAlign: 'right'},
  { dataField: 'netProfit', text: 'net profit', align: 'right', headerAlign: 'right'},
]

const shortPositionRoundTripFeeData = [
  { id: 1, fee: 'Deposit Tx', cost: '$1.678' },
  { id: 2, fee: 'Sell Spread', cost: '$0.00' },
  { id: 3, fee: 'Sell Tx', cost: '$1.58' },
  { id: 4, fee: 'Buy Commission', cost: '$0.005' },
  { id: 5, fee: 'Buy Tx', cost: '$1.53' },
  { id: 6, fee: 'Buy Spread', cost: '$0.00' },
  { id: 7, fee: 'Burn Tx', cost: '$1.53' },
  { id: 7, fee: 'Protocol Fee', cost: '$10.12' },
  { id: 7, fee: 'Total:', cost: '$16.443' },
]

const shortPositionRountTripFeeColumns = [
  { dataField: 'fee', text: 'Fee'},
  { dataField: 'cost', text: 'Cost', align: 'right', headerAlign: 'right'},
]

export {
  longPositionRoundTripTableData,
  longPositionRountTripTableColumns,
  longPositionRoundTripFeeData,
  longPositionRountTripFeeColumns,
  largePoolFeeData,
  largePoolPercentData,
  smallPoolFeeData,
  chartOptions,
  shortPositionRoundTripTableData,
  shortPositionRountTripTableColumns,
  shortPositionRoundTripFeeData,
  shortPositionRountTripFeeColumns,
}
