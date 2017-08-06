import React, { Component } from 'react';
import numeral from 'numeral';

const StatsTable = ({ summaryStats, dataLabel }) => {
  const { annualizedReturn, annualizedVolatility, countMonthlyReturns,
    maxDrawdown, maxDrawdownDate, percentMonthlyPositive, sharpe,
    monthlyAverage, timePeriod, worstMonth, ytdReturn,
  } = summaryStats;

  return (
    <table className="ui compact celled definition table">
      <thead>
        <tr>
          <th>Field</th>
          <th>Benchmark</th>
          <th>{dataLabel}</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Date Range</td>
          <td></td>
          <td>{timePeriod}</td>
        </tr>
        <tr>
          <td>Annualzed Return</td>
          <td></td>
          <td>{numeral(annualizedReturn).format('0,0.0%')}</td>
        </tr>
        <tr>
          <td>Annualized Volatility</td>
          <td></td>
          <td>{numeral(annualizedVolatility).format('0,0.0%')}</td>
        </tr>
        <tr>
          <td>Sharpe Ratio</td>
          <td></td>
          <td>{numeral(sharpe).format('0.00')}</td>
        </tr>
        <tr>
          <td>YTD Return</td>
          <td></td>
          <td>{numeral(ytdReturn).format('0,0.0%')}</td>
        </tr>
        <tr>
          <td>Monthly Returns</td>
          <td></td>
          <td>{numeral(monthlyAverage).format('0,0.0%')} Average</td>
        </tr>
        <tr>
          <td>% Positive Months</td>
          <td></td>
          <td>{numeral(percentMonthlyPositive).format('0,0.0%')} ({numeral(countMonthlyReturns).format('0,0')} observations)</td>
        </tr>
        <tr>
          <td>Minimum Monthly Return</td>
          <td></td>
          <td>{numeral(worstMonth).format('0,0.0%')}</td>
        </tr>
        <tr>
          <td>Max Drawdown</td>
          <td></td>
          <td>{numeral(maxDrawdown).format('0,0.0%')} ({maxDrawdownDate})</td>
        </tr>
      </tbody>
    </table>
  )
}

export default StatsTable;