import React from "react"
import Select from "react-select"
import {
  Col,
  FormGroup,
  Label,
  Card,
  CardBody
} from "reactstrap"
import ReactApexChart from "react-apexcharts"
import tokenDictApi from '../../api/v1/token-dictionary'
import mirrorGraphql from '../../api/v1/mirror-graphql'


class SpreadTracker extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      series: [],
      options: {
        chart: { toolbar: "false" },
        dataLabels: { enabled: !1 },
        stroke: { curve: "smooth", width: 2 },
        markers: { size: 0, style: "hollow" },
        xaxis: {
          type: "datetime",
          forceNiceScale: true,
        },
        yaxis: [
          {
            seriesName: "mPrice",
            forceNiceScale: true,
          },
          {
            seriesName: "mPrice",
            forceNiceScale: true,
            show: false,
            
          },
          {
            seriesName: "Spread",
            forceNiceScale: true,
            opposite:true
          }
        ],
        tooltip: {
            shared:true,
            x: { 
              format: "dd MMM yyyy HH:mm"
              } 
            },
        colors: ['#2E93fA', '#66DA26', '#546E7A', '#E91E63', '#FF9800'],
        noData: {
          text: 'Choose Symbol'
        },
      },
      tickerOptions: [],
      tokenAddresses: {},
    }
    this.fetchSpreadData = this.fetchSpreadData.bind(this)
    this.fetchTickers.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  fetchTickers() {
    tokenDictApi.getTokenDict().then(apiData => {
      let tokenObj = apiData[0] ? apiData[0].token : {}
      this.setState(_ => ({
        tickerOptions: Object.keys(tokenObj).map(ticker => {
          return { value: ticker, label: ticker }
        }),
        tokenAddresses: tokenObj,
      }))
    })
  }

  fetchSpreadData(ticker) {
    let currentTime = new Date().getTime()
    let filters = {
      from: currentTime - 87400000,
      to: currentTime - 300000,
      interval: 5,
      token: this.state.tokenAddresses[ticker],
    }
    mirrorGraphql.getSpreadData(filters).then(data => {
      let formattedPriceData = data.asset.prices.history
        .map(obj => [
          obj.timestamp,
          obj.price
        ])
      let formattedOracleData = data.asset.prices.oracleHistory
        .map(obj => [
          obj.timestamp,
          obj.price
        ])
      let formattedSpreadData = data.asset.prices.history.map(function(item, index) {
          return {'spread': ((Number(item['price']) - Number(data.asset.prices.oracleHistory[index]['price']))/Number(data.asset.prices.oracleHistory[index]['price'])).toFixed(4),
                  'timestamp':item['timestamp']};
        }).map(obj => [
          obj.timestamp,
          obj.spread
        ])
      this.setState(_ => ({
        series: [{
          name: "mPrice",
          data: formattedPriceData,
        }, {
          name: "Oracle",
          data: formattedOracleData,
        }, {
          name: "Spread",
          data: formattedSpreadData,
        }]
      }))
    })
  }

  handleChange(selectedOption) {
    this.fetchSpreadData(selectedOption.value)
  }

  componentDidMount() {
    // load latest month by default
    this.fetchTickers()
  }

  render() {
    return (
      <React.Fragment>
        <Col xl="10">
        <Card>
            <CardBody>
              <FormGroup className="select2-container mb-3">
                <Label className="control-label">Assets</Label>
                <Select
                  classNamePrefix="form-control"
                  placeholder="Choose ..."
                  title="mAsset"
                  options={this.state.tickerOptions}
                  onChange={this.handleChange}
                />
              </FormGroup>
              <ReactApexChart
                options={this.state.options}
                series={this.state.series}
                type="line"
                height={500}
              />
          </CardBody>
        </Card>
        </Col>
      </React.Fragment>
    )
  }
}

export default SpreadTracker
