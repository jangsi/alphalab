import React   from "react"
import {
  Container,
  Col,
  Row,
  Card,
  CardBody
} from "reactstrap"
import Breadcrumbs from "../../components/Common/Breadcrumb"
import BootstrapTable from "react-bootstrap-table-next"
import {
  shortPositionRoundTripTableData,
  shortPositionRountTripTableColumns,
  shortPositionRoundTripFeeData,
  shortPositionRountTripFeeColumns,
} from "../../common/data/fee-station"



class FeeStationShort extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      data1: shortPositionRoundTripTableData,
      columns1: shortPositionRountTripTableColumns,
      data2: shortPositionRoundTripFeeData,
      columns2: shortPositionRountTripFeeColumns,
    }
  }

  componentDidMount() {
  }


  render() {
    return (
      <React.Fragment>
        <div className="page-content">
          <Container fluid>
            <Breadcrumbs title="Dashboards" breadcrumbItem="Short Sale Round Trip" />
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
                <Card>
                  <CardBody className="card-body-test">
                    <p>
                      <div>
                        <em>(Gross profit)</em> $52.79 + <em>(Total earn yield)</em> $21.68 + <em>(Total farm yield)</em> $22.22 – <em>(Total costs)</em> $16.44 = <em>(Net profit)</em> $80.25 or 6.17% net gain
                      </div>
                      <br/>
                      <div>
                        This example shows a yield farming scenario where a trader earns interest on a savings deposit and simultaneously earns staking rewards for providing short liquidity on an mAsset. Our 1 month aUST yield rate is 20% valued at $21.68, while our short LP reward rate is 36.84% valued at $22.22. Minting in mirror requires collateral and in this example we use aUST that has a collateral ratio of 180%.
                      </div>
                      <br/>
                      <div>
                        * Closing a short position requires the buying to cover the same quantity, but due to slippage and commission fees, we added (0.5% + 0.3% = 0.8%) to the buy order in order to guarantee that our order fill will be enough to cover.
                      </div>
                      <br/>
                      <div>
                        The table below shows all the fees associated with this round trip trade of mAAPL
                      </div>
                    </p>
                  </CardBody>
                </Card>
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
                <Card>
                  <CardBody className="card-body-test">
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
                      <li>
                        <a href="https://docs.mirror.finance/protocol/mirrored-assets-massets#protocol-fee">Protocol Fee</a> – 1.5% of the (mAsset * open price) is charged to withdraw collateral.
                      </li>
                    </ul>
                  </CardBody>
                </Card>
              </Col>
            </Row>
            <Row>
              <Col xl="10">
                <Card>
                  <CardBody className="card-body-test">
                    <p>
                      Relative to a long only strategy, shorting in mirror involves more steps and more fees. In addition to the usual commission, tx, and spread, a trader will have to pay 1.5% of the mAsset times its open price to withdraw collateral. Additionally, a trader will have to monitor and ensure the collateral ratio stays above the required threshold. Otherwise, their collateral may get liquidated.
                    </p>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </Container>
        </div>
      </React.Fragment>
    )
  }
}

export default FeeStationShort
