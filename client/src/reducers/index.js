import { combineReducers } from 'redux';
import sampleReducer from './sampleReducer';

const allReducer = combineReducers({
  sample: sampleReducer,
});

export default allReducer;