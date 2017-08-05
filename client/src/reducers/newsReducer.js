const initialState = {
  news: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'UPDATE_NEWS':
      return Object.assign({}, state, { news: action.news });

    default:
      return state;
  }
};
