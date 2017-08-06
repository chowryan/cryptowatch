const initialState = {
  chartData: [],
  strategyData: [],
  start: new Date(),
  end: new Date((new Date()).setMonth((new Date()).getMonth() - 6)),
  granularity: 0,
  dateRange: '6 Months',
  productId: 'BTC-USD',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'UPDATE_CHART':
      return Object.assign({}, state, { chartData: action.chartData });
    case 'UPDATE_START_DATE':
      return Object.assign({}, state, { start: action.start });
    case 'UPDATE_END_DATE':
      return Object.assign({}, state, { end: action.end });
    case 'UPDATE_GRANULARITY':
      return Object.assign({}, state, { granularity: action.granularity });
    case 'UPDATE_DATE_RANGE':
      return Object.assign({}, state, { dateRange: action.dateRange });
    case 'UPDATE_PRODUCT_ID':
      return Object.assign({}, state, { productId: action.productId });
    case 'UPDATE_STRATEGY_DATA':
      return Object.assign({}, state, { strategyData: action.strategyData });
    default:
      return state;
  }
};