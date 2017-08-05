import { combineReducers } from 'redux';
import sampleReducer from './sampleReducer';
import newsReducer from './newsReducer';
import strategyChartReducer from './strategyChartReducer';

const allReducer = combineReducers({
  sample: sampleReducer,
  news: newsReducer,
  strategyChart: strategyChartReducer,
});

export default allReducer;