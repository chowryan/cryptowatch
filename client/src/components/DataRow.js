import React, { Component } from 'react';

const DataRow = ({ date, price }) => (
  <tr>
    <td>{date}</td>
    <td>{price}</td>
  </tr>
)

export default DataRow;