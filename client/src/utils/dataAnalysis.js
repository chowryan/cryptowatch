
const convertToDecimal = (array) => array.map(obj => ({ date: obj.date, price: obj.price / 100 }));

const calcMaxDrawDown = (array) => {
  let maxPrice = array[0].price;
  let maxDate = array[0].date;
  let currentMaxPrice = array[0].price;
  let currentMaxDate = array[0].date;
  let minPrice = array[0].price;
  let minDate = array[0].date;
  let maxDiff = 0;

  array.forEach((data) => {
    if (data.price > currentMaxPrice) {
      [currentMaxPrice, currentMaxDate] = [data.price, data.date];
    } else if ((data.price / currentMaxPrice) - 1 < maxDiff) {
      [maxPrice, maxDate, minPrice, minDate, maxDiff] =
        [currentMaxPrice, currentMaxDate, data.price, data.date, (data.price / currentMaxPrice) - 1];
    }
  });

  return [maxPrice, maxDate, minPrice, minDate, maxDiff];
};

const calcRiskPremiums = (returns) => { // , rfData
  const riskPremiums = [];
  let index = 0;
  returns.forEach((returnObj) => {
    riskPremiums.push(returnObj.dayReturn);
    // while (index < rfData.length && rfData[index].date < returnObj.date) {
    //   index += 1;
    // }
    // riskPremiums.push(returnObj.dayReturn - rfData[Math.min(index, rfData.length - 1)].price);
  });
  return riskPremiums;
};

const getAnnualizedReturn = (date1, price1, date2, price2) => {
  const days = Date.daysBetween(date1, date2);
  return Math.pow((price2 / price1), (365.25 / days)) - 1;
};

const getIntradayReturns = (array) => {
  const result = [];
  for (let i = 1; i < array.length; i += 1) {
    const date = array[i].date;
    const dayReturn = array[i].price / array[i - 1].price - 1;
    result.push({ date, dayReturn });
  }
  return result;
};

const standardDeviation = (values) => {
  const avg = values.reduce((a, b) => a + +b.dayReturn, 0) / values.length;
  const squareDiffs = values.map((obj) => {
    const diff = obj.dayReturn - avg;
    return diff * diff;
  });
  const avgSquareDiff = squareDiffs.reduce((a, b) => a + b, 0) / squareDiffs.length;
  return Math.sqrt(avgSquareDiff);
};

const getYtdReturn = (values) => {
  let index = values.length - 1;
  const year = new Date(values[values.length - 1].date).getFullYear();
  while (new Date(values[index].date).getFullYear() === year && index > 0) {
    index -= 1;
  }
  return +values[values.length - 1].price / +values[index].price - 1;
};

const getMonthlyReturns = (values) => {
  let index1 = 0;
  let index2 = 0;
  const results = [];
  const thirtyDays = 30 * 1000 * 60 * 60 * 24;

  let date1_ms = new Date(values[index1].date).getTime();
  let date2_ms = new Date(values[index2].date).getTime();

  while (index2 < values.length) {
    while ((date2_ms - date1_ms) < thirtyDays) {
      index2 += 1;
      if (index2 < values.length) {
        date2_ms = new Date(values[index2].date).getTime();
      } else {
        date2_ms += 1000000;
      }
    }
    if (index2 < values.length) results.push(+values[index2].price / +values[index1].price - 1);
    index1 += 1;
    date1_ms = new Date(values[index1].date).getTime();
  }

  const average = results.reduce((a, b) => a + b, 0) / results.length;
  console.log('Average monthly return: ', average);

  return results;
};

Date.daysBetween = (date1, date2) => {   //Get 1 day in milliseconds   
  const one_day = 1000 * 60 * 60 * 24;    // Convert both dates to milliseconds
  const date1_ms = new Date(date1).getTime();
  const date2_ms = new Date(date2).getTime();    // Calculate the difference in milliseconds  
  const difference_ms = date2_ms - date1_ms;        // Convert back to days and return
  return Math.round(difference_ms / one_day);
};

Date.format = (date) => {
  date = new Date(date);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return `${month}/${day}/${year}`;
};

/**
 *  Sharpe ratio
 *
 *  Daily returns
 *  Annualized standard deviation = stdev * sqrt (observations in a year)
 */

const calcSummaryStats = (priceData, startDate, endDate) => {

  console.log('###### SUMMARY STATS #######');

  let asset = priceData;

  if (startDate && endDate) {
    console.log(startDate, endDate);
    asset = asset.filter(data => data.date >= new Date(startDate) && data.date <= new Date(endDate));
  }

  // Calculate Overall Return
  const first = asset[0];
  const last = asset[asset.length - 1];
  console.log('******', first, last);
  const annualizedReturn = getAnnualizedReturn(first.date, first.price, last.date, last.price);
  console.log('Time period: ', Date.format(first.date), '-', Date.format(last.date));
  console.log('Annualized return: ', annualizedReturn);

  // Calculate Risk / SHarpe Ratio
  const dailyReturns = getIntradayReturns(asset);
  const avgDailyReturn = dailyReturns.reduce((a, b) => a + b.dayReturn, 0) / dailyReturns.length;
  // const rf = convertToDecimal(rfRates);
  const riskPremiums = calcRiskPremiums(dailyReturns);
  // const riskPremiums = calcRiskPremiums(dailyReturns, rf);
  // Annualize: calculate average number of observations in a year
  const days = Date.daysBetween(first.date, last.date);
  const multiplier = Math.sqrt(riskPremiums.length / (days / 365));

  const stdDev = standardDeviation(dailyReturns);
  const ytdReturn = getYtdReturn(asset);
  const monthlyReturns = getMonthlyReturns(asset);

  console.log();
  console.log('===========');
  // monthlyReturns.forEach(x => console.log(x));

  const sharpe = (avgDailyReturn / stdDev) * multiplier;

  const percentMonthlyPositive = monthlyReturns.filter(x => x > 0).length / monthlyReturns.length;
  const worstMonth = monthlyReturns.reduce((a, b) => (b < a) ? b : a, 0);

  // console.log('Average daily return: ', avgDailyReturn);
  console.log('Standard deviation: ', stdDev);
  console.log('Annualized Volatility: ', stdDev * Math.sqrt(riskPremiums.length / (days / 365)));
  // console.log('Multiplier: ', multiplier);
  console.log('Sharpe Ratio (annualized): ', sharpe);
  console.log('YTD return: ', ytdReturn);
  console.log('Monthly returns: observations: ', monthlyReturns.length);
  console.log(' - % of positive months: ', percentMonthlyPositive);
  console.log(' - min monthly return: ', worstMonth);

  // Max drawdown
  const [peak, peakDate, trough, troughDate] = calcMaxDrawDown(asset);
  console.log('Max drawdown: ', Math.round((trough / peak - 1) * 1000) / 10, '% (', Date.format(peakDate), '-', Date.format(troughDate), ')');

  const summaryData = {
    timePeriod: `${Date.format(first.date)} - ${Date.format(last.date)}`,
    annualizedReturn,
    sharpe,
    percentMonthlyPositive,
    worstMonth,
    stdDev,
    annualizedVolatility: stdDev * Math.sqrt(riskPremiums.length / (days / 365)),
    ytdReturn,
    countMonthlyReturns: monthlyReturns.length,
    percentMonthlyPositive,
    worstMonth,
    maxDrawdown: Math.round((trough / peak - 1) * 1000) / 1000,
    maxDrawdownDate: `${Date.format(peakDate)} - ${Date.format(troughDate)}`,
  };

  return summaryData;
};

module.exports = {
  calcSummaryStats,
};
