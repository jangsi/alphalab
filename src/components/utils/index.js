export function pctFormatter(params) {
  return Number(params.value*100).toFixed(2) + '%';
};

export function scoreFormatter(params) {
  return Number(params.value).toFixed(2);
};

export function priceFormat(tickItem) {
  return String(Number(tickItem*100).toFixed(2))+'%'
};
