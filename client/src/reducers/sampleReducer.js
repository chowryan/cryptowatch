const initialState = {
  sample: 'sample',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'SAMPLE_ACTION':
      return Object.assign({}, state, { sample: action.props });

    default:
      return state;
  }
};
