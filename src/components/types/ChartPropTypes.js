import PropTypes from 'prop-types';

export const ChartProps = {
  data: PropTypes.arrayOf(PropTypes.shape({
    APR: PropTypes.number,
    xaxis1: PropTypes.string,
  })),
  defaultOption: PropTypes.any,
  asset: PropTypes.any,
  onAssetChange: PropTypes.func,
  startDate: PropTypes.any,
  onStartDateChange: PropTypes.func,
  endDate: PropTypes.any,
  onEndDateChange: PropTypes.func,
  tickers: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string,
    value: PropTypes.string,
  })),
  title: PropTypes.string,
  yAxisKey: PropTypes.string,
  yAxisFormatter: PropTypes.func,
};

const TableColums = PropTypes.shape({
  field: PropTypes.string,
  tooltip: PropTypes.string,
  formatter: PropTypes.func,
  minWidth: PropTypes.number,
})

export const TableProps = {
  stickyColumn: TableColums,
  otherColumns: PropTypes.arrayOf(TableColums),
  data: PropTypes.arrayOf(PropTypes.object),
  onReady: PropTypes.func,
};
