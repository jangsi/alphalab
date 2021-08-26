import React, { useState, useEffect }   from "react"
import Select from "react-select"
import {
  Container,
  Col,
  Row,
  FormGroup,
  Label,
  Card,
  CardBody
} from "reactstrap"
import Breadcrumbs from "../../components/Common/Breadcrumb"
import tokenDictApi from '../../api/v1/token-dictionary'
import mirrorGraphql from '../../api/v1/mirror-graphql'
import historicalApi from '../../api/v1/historical'
import {AgGridColumn, AgGridReact} from 'ag-grid-react'
import BootstrapTable from "react-bootstrap-table-next"
import {LineChart, Line, XAxis, YAxis, Tooltip, Legend} from 'recharts'
import {
  longPositionRoundTripTableData,
  longPositionRountTripTableColumns,
  longPositionRoundTripFeeData,
  longPositionRountTripFeeColumns
} from "../../common/data/fee-station"



class FeeStationLong extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      data1: longPositionRoundTripTableData,
      columns1: longPositionRountTripTableColumns,
      data2: longPositionRoundTripFeeData,
      columns2: longPositionRountTripFeeColumns,
      tickerOptions: [],
      tokenAddresses: {},
    }
  }

  componentDidMount() {
  }


  render() {
    return (
      <React.Fragment>
        <div className="page-content">
          <Container fluid>
            <Breadcrumbs title="Dashboards" breadcrumbItem="Long Position Round Trip" />
            <Row>
              <Col xl="10">
                <Card >
                  <CardBody className="card-body-test">
                    <BootstrapTable
                      keyField='id'
                      data={this.state.data1}
                      columns={this.state.columns1}
                      striped
                      hover
                      condensed
                    >
                    </BootstrapTable>
                  </CardBody>
                </Card>
              </Col>
            </Row>
            <Row>
              <Col xl="10">
                <p>
                  <div>
                    <em>(Gross profit)</em> $50.00 – <em>(Total costs)</em> $6.18 = <em>(Net profit)</em> $43.82 or 6.7% net gain
                  </div>
                  <div>
                    This example shows a typical scenario where a trader buys and sells an mAsset. The table below shows all the fees associated with this round trip trade of mAAPL
                  </div>
                </p>
              </Col>
            </Row>
            <Row>
              <Col xl="10">
                <Card >
                  <CardBody className="card-body-test">
                    <BootstrapTable
                      keyField='id'
                      data={this.state.data2}
                      columns={this.state.columns2}
                      striped
                      hover
                      condensed
                    >
                    </BootstrapTable>
                  </CardBody>
                </Card>
              </Col>
            </Row>
            <Row>
              <Col xl="10">
                <ul>
                  <li>
                    <a href="https://docs.mirror.finance/protocol/terraswap#lp-commission">Commission Fee</a> – Fixed 0.3% fee on every trade.
                  </li>
                  <li>
                  <a href="https://docs.terra.money/luna.html#taxes">Tx Fee</a> – Also known as the stability fee or transaction fee, is calculated as the minimum of either (1000*tax_rate) or 1 TerraSDR. The Tax Rate is a parameter agreed upon by the network.
                  </li>
                  <li>
                  <a href="https://docs.mirror.finance/protocol/terraswap#pricing">Spread fee</a> – Also known as slippage or the deviation from the expected price. Users can set the maximum deviation from the expected price. If the spread is greater than the max slippage, the transaction will revert.
                  </li>
                </ul>
              </Col>
            </Row>
            <Row>
              <Col xl="10">
                <p>
                  In our example, we set the max slippage rate to 0.5%. Our trade value is so small compared to the current mAAPL pool that the spread was negligible. However, a smaller pool like mGLXY and a larger trade value could incur a nontrivial spread fees.
                </p>
              </Col>
            </Row>
          </Container>
        </div>
      </React.Fragment>
    )
  }
}

export default FeeStationLong
