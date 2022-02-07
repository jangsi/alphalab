export function pctFormatter(val) {
  return Number(val*100).toFixed(2) + '%';
};

export function scoreFormatter(val) {
  return Number(val).toFixed(2);
};

export function numberFormat(val) {
  return Number(val/1000000).toLocaleString('en-US', {maximumFractionDigits:2})+' M';
};
