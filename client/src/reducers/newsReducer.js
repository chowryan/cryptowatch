const initialState = {
  news: [],
  tweets: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'UPDATE_NEWS':
      return Object.assign({}, state, { news: action.news });
    case 'UPDATE_TWEETS':
      return Object.assign({}, state, { tweets: action.tweets });
    default:
      return state;
  }
};
