import dayjs from 'dayjs'

export const fetchAprData = (report) => {
  const filter = {
    ticker: report.ticker,
    precision: 'day',
  };
  return new Promise((resolve, reject) => {
    report.action(filter).then((data) => {
      const formattedData = data.map(d => ({
        xaxis1: dayjs(d.date).format('MM/DD/YYY HH:mm:ss'),
        Price: d.apr,
      }));
      resolve(String(Number(formattedData[formattedData.length-1].Price *100).toFixed(2)) + '%');
    }).catch((err) => {
      console.error('Failed to pull report for', JSON.stringify(report), err);
      reject(err);
    });
  });
};
