import dayjs from 'dayjs'

export const fetchData = (report, widgetFormatter, fieldKey) => {
  if (!report.ticker) return;
  const filter = {
    ticker: report.ticker,
    precision: 'day',
  };
  return new Promise((resolve, reject) => {
    report.action(filter).then((data) => {
      const formattedData = data.filter(d => d[fieldKey]).map(d => ({
        xaxis1: dayjs(d.date).format('MM/DD/YYY HH:mm:ss'),
        Price: d[fieldKey],
      }));
      if (formattedData.length) {
        resolve(widgetFormatter(formattedData[formattedData.length-1]));
      } else {
        resolve('');
      }
    }).catch((err) => {
      console.error('Failed to pull report for', JSON.stringify(report), err);
      reject(err);
    });
  });
};
