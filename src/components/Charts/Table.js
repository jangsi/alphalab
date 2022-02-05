import React from 'react';
import { AgGridColumn, AgGridReact } from 'ag-grid-react'
import { TableProps } from '../types/ChartPropTypes';
import ChartHeader from '../../components/ChartHelpers/chartHeader';
import FullscreenComponent from '../../components/FullscreenComponent';
import {
  Card,
  CardBody,
} from 'reactstrap';

const Table = (props) => (
  <FullscreenComponent defaultHeight={600}>
    {({ toggleFullscreen, icon, chartParams, headerRef }) => {
      return (
        <Card>
          <CardBody>
            <div ref={headerRef} style={{ paddingBottom: 20 }}>
              <ChartHeader
                title="Hover Mouse for Column Descriptions"
                callbackOpts={{ action: toggleFullscreen, icon }}
              />
            </div>
            <div className="ag-theme-alpine" style={chartParams.maybeRotatedContainer()}>
              <AgGridReact
                style={chartParams.maybeRotatedContainer()}
                onGridReady={props.onReady}
                rowData={props.data}
                defaultColDef={{ resizable: true, minWidth: 140, filter: true, sortable: true }}
              >
                <AgGridColumn field={props.stickyColumn.field} headerTooltip={props.stickyColumn.tooltip} pinned="left" />
                {props.otherColumns.map(c => (
                  <AgGridColumn
                    key={c.field}
                    field={c.field}
                    valueFormatter={c.formatter}
                    headerTooltip={c.tooltip}
                    minWidth={c.minWidth}
                  />
                ))}
              </AgGridReact>
            </div>
          </CardBody>
        </Card>
      )
    }}
  </FullscreenComponent>
);

Table.propTypes = TableProps;

export default Table;
