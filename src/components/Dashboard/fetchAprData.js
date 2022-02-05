import dayjs from 'dayjs'

export const fetchAprData = (report) => {
  const filter = {
    ticker: report.ticker,
    precision: 'day',
  };
  return new Promise((resolve, reject) => {
    report.action(filter).then((data) => {
      console.log('data', data);
      const formattedData = data.filter(d => d.apr).map(d => ({
        xaxis1: dayjs(d.date).format('MM/DD/YYY HH:mm:ss'),
        Price: d.apr,
      }));
      if (formattedData.length) {
        resolve(String(Number(formattedData[formattedData.length-1].Price *100).toFixed(2)) + '%');
      } else {
        resolve('');
      }
    }).catch((err) => {
      console.error('Failed to pull report for', JSON.stringify(report), err);
      reject(err);
    });
  });
};
