import React from 'react';
import { ChartProps } from '../types/ChartPropTypes';
import {
  FormGroup,
  Card,
  CardBody,
} from 'reactstrap';
import Select from 'react-select';
import ChartHeader from '../../components/ChartHelpers/chartHeader';
import FullscreenComponent from '../../components/FullscreenComponent';
import { isMobileOrTablet } from '../../pages/Utility/isMobileOrTablet';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import { Line } from 'react-chartjs-2';

const LineChart = (props) => {
  const { data } = props;
  return (
    <FullscreenComponent defaultHeight={600}>
      {({ toggleFullscreen, icon, chartParams, isFullscreen, headerRef }) => {
        return (
          <Card>
            <CardBody className="card-body-test">
              <div ref={headerRef} style={{ width: chartParams.maybeRotatedContainer().width }}>
                <ChartHeader
                  title={props.title}
                  callbackOpts={{ action: toggleFullscreen, icon: icon }}
                />
                <FormGroup className="w-25 select2-container mb-3 d-inline-block me-2">
                  <Select
                    classNamePrefix="form-control"
                    placeholder="TYPE or CHOOSE ..."
                    options={props.tickers}
                    defaultValue={props.defaultOption}
                    onChange={props.onAssetChange}
                    value={props.asset}
                  />
                </FormGroup>
                <FormGroup className="w-25 d-inline-block pb-2 me-2">
                  <DatePicker
                    className="form-control"
                    selected={props.startDate}
                    onChange={props.onStartDateChange}
                  />
                </FormGroup>
                <div className="d-inline-block me-2">~</div>
                <FormGroup className="w-25 d-inline-block pb-2">
                  <DatePicker
                    className="form-control"
                    selected={props.endDate}
                    onChange={props.onEndDateChange}
                  />
                </FormGroup>
              </div>
              <div style={chartParams.container}>
                <Line
                  redraw
                  {...chartParams.maybeRotatedContainer()}
                  data={{
                    datasets: [{
                      label: props.yAxisKey,
                      data: data.map(d => ({ y: d[props.yAxisKey], x: d.xaxis1 })),
                      borderColor: '#8884d8',
                    }]
                  }}
                  options={{
                    // when fullscreen && mobile we want to have full control over sizing
                    responsive: !(isFullscreen && isMobileOrTablet()),
                    maintainAspectRatio: false,
                    plugins: {
                      legend: {
                        position: 'bottom',
                      },
                      title: {
                        display: false,
                      },
                    },
                    scales: {
                      y: {
                        ticks: {
                          callback: (v) => props.yAxisFormatter ? props.yAxisFormatter(v) : v,
                        },
                      },
                    },
                  }}
                />
              </div>
            </CardBody>
          </Card>
        )
      }}
    </FullscreenComponent>
  );
};

LineChart.propTypes = ChartProps;

export default LineChart;
