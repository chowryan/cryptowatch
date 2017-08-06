import React, { Component } from 'react';
import numeral from 'numeral';
import { Icon, Container, Input, Table, Segment, Button } from 'semantic-ui-react';


const StatsTable = ({ summaryStats, dataLabel }) => {
  const { annualizedReturn, annualizedVolatility, countMonthlyReturns,
    maxDrawdown, maxDrawdownDate, percentMonthlyPositive, sharpe,
    monthlyAverage, timePeriod, worstMonth, ytdReturn,
  } = summaryStats;

  return (
    <div>
      <Table celled>
        <Table.Header>
          <Table.Row textAlign="center">
            <Table.HeaderCell>Field</Table.HeaderCell>
            <Table.HeaderCell>Benchmark</Table.HeaderCell>
            <Table.HeaderCell>{dataLabel}</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          <Table.Row>
            <Table.Cell>Data Range</Table.Cell>
            <Table.Cell></Table.Cell>
            <Table.Cell>{timePeriod}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Annualized Return</Table.Cell>
            <Table.Cell></Table.Cell>
            <Table.Cell>{numeral(annualizedReturn).format('0,0.0%')}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Annualized Volatility</Table.Cell>
            <Table.Cell></Table.Cell>
            <Table.Cell>{numeral(annualizedReturn).format('0,0.0%')}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Sharpe Ratio</Table.Cell>
            <Table.Cell></Table.Cell>
            <Table.Cell>{numeral(sharpe).format('0.00')}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>YTD Return</Table.Cell>
            <Table.Cell></Table.Cell>
            <Table.Cell>{numeral(ytdReturn).format('0,0.0%')}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Monthly Returns</Table.Cell>
            <Table.Cell></Table.Cell>
            <Table.Cell>{numeral(monthlyAverage).format('0,0.0%')} Average</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>% Positive Months</Table.Cell>
            <Table.Cell></Table.Cell>
            <Table.Cell>{numeral(percentMonthlyPositive).format('0,0.0%')} ({numeral(countMonthlyReturns).format('0,0')} observations)</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Minimum Monthly Return</Table.Cell>
            <Table.Cell></Table.Cell>
            <Table.Cell>{numeral(worstMonth).format('0,0.0%')}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Maximum Drawdown</Table.Cell>
            <Table.Cell></Table.Cell>
            <Table.Cell>{numeral(maxDrawdown).format('0,0.0%')} ({maxDrawdownDate})</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    </div>
  )
}

export default StatsTable;