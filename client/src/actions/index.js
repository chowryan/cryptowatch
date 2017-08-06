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

export const updateChart = (chartData) => {
  return {
    type: 'UPDATE_CHART',
    chartData,
  };
};

export const updateStartDate = (start) => {
  return {
    type: 'UPDATE_START_DATE',
    start,
  };
};

export const updateEndDate = (end) => {
  return {
    type: 'UPDATE_END_DATE',
    end,
  };
};

export const updateGranularity = (granularity) => {
  return {
    type: 'UPDATE_GRANULARITY',
    granularity,
  };
};

export const updateDateRange = (dateRange) => {
  return {
    type: 'UPDATE_DATE_RANGE',
    dateRange,
  };
};

export const updateProductId = (productId) => {
  return {
    type: 'UPDATE_PRODUCT_ID',
    productId,
  };
};

export const updateTweets = (tweets) => {
  return {
    type: 'UPDATE_TWEETS',
    tweets,
  };
};
