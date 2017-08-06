// sample actions
export const sampleAction = (props) => {
  return {
    type: 'SAMPLE_ACTION',
    props,
  };
};

export const updateNews = (news) => {
  return {
    type: 'UPDATE_NEWS',
    news,
  };
};