import React from "react"
import Select from "react-select"
import {
  Col,
  FormGroup,
  Label,
  Card,
  CardBody
} from "reactstrap"
import poolDictApi from '../../api/v1/pool-dictionary'
import historical from '../../api/v1/historical'
import {AgGridColumn, AgGridReact} from 'ag-grid-react'

//Import Date Picker
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"

import {LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer} from 'recharts'

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css'
import dayjs from 'dayjs'


//fetch kujira data (not working because its blocked so might have to make own API to get around it)
const fetchNodes = () => {
  return fetch(
    "https://api.coinhall.org/api/v1/charts/terra/candles?bars=320&from=1641492129&interval=1h&pairAddress=terra1tndcaqxkpc5ce9qee5ggqf430mr2z3pefe5wj6&quoteAsset=uusd&to=1642644129"
    //"https://api.kujira.app/api/terra1vn5s4s7gpp4yu0mtad8recncyh2h2c6l4qesd6/borrowers/summary"
  );
};


//fetch luna data
const fetchHistory = () => {
  return fetch(
    "https://api.coinhall.org/api/v1/charts/terra/candles?bars=320&from=1641492129&interval=1h&pairAddress=terra1tndcaqxkpc5ce9qee5ggqf430mr2z3pefe5wj6&quoteAsset=uusd&to=1642644129"
  );
};

//fetch live terraswap luna price
//formula (number of luna/total share)/(number of UST/total share) 
const fetchLivePrice = () => {
  return fetch(
    "https://fcd.terra.dev/wasm/contracts/terra1tndcaqxkpc5ce9qee5ggqf430mr2z3pefe5wj6/store?query_msg={%22pool%22:{}}"
  );
};



class liqNodes extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
     
      rowData: [],
      
    }
    this.fetchData = this.fetchData.bind(this);
    this.onGridReady = this.onGridReady.bind(this);
  }

  async fetchData() {
    const response = await fetchNodes();
    const data = await response.json();
    console.log(data);
    this.setState({ rowData: data });
  }


  onGridReady() {
  }

  componentDidMount() {
    this.fetchData()
  }

  render() {
    return (
      <React.Fragment>
        <Col xl="12">
          <Card >
            <CardBody className="card-body-test">
             
              <div style={{height: 600}}>
              {this.state.rowData.keys()}
              </div>
            </CardBody>
          </Card>
        </Col>
      </React.Fragment>
    )
  }
}

export default liqNodes
