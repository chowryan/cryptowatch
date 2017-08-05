import { combineReducers } from 'redux';
import sampleReducer from './sampleReducer';
import newsReducer from './newsReducer';

const allReducer = combineReducers({
  sample: sampleReducer,
  news: newsReducer,
});

export default allReducer;