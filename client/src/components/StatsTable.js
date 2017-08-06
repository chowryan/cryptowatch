import React, { Component } from 'react';
import numeral from 'numeral';

const StatsTable = ({ summaryStats }) => {
  const { annualizedReturn, annualizedVolatility, countMonthlyReturns,
    maxDrawdown, maxDrawdownDate, percentMonthlyPositive, sharpe,
    stdDev, timePeriod, worstMonth, ytdReturn,
  } = summaryStats;

  return (
    <table className="ui compact celled definition table">
      <tbody>
        <tr>
          <td>Date Range</td>
          <td>{timePeriod}</td>
        </tr>
        <tr>
          <td>Annualzed Return</td>
          <td>{numeral(annualizedReturn).format('0,0.00%')}</td>
        </tr>
        <tr>
          <td>Annualized Volatility</td>
          <td>{numeral(annualizedVolatility).format('0,0.00%')}</td>
        </tr>
        <tr>
          <td>Sharpe Ratio</td>
          <td>{numeral(sharpe).format('0.00')}</td>
        </tr>
        <tr>
          <td>YTD Return</td>
          <td>{numeral(ytdReturn).format('0,0.00%')}</td>
        </tr>
        <tr>
          <td>Monthly Returns</td>
          <td></td>
        </tr>
        <tr>
          <td>% Positive Months</td>
          <td>{numeral(percentMonthlyPositive).format('0,0.00%')}</td>
        </tr>
        <tr>
          <td>Minimum Monthly Return</td>
          <td>{numeral(worstMonth).format('0,0.00%')}</td>
        </tr>
        <tr>
          <td>Max Drawdown</td>
          <td>{numeral(maxDrawdown).format('0,0.00%')} ({maxDrawdownDate})</td>
        </tr>
      </tbody>
    </table>
  )
}

export default StatsTable;