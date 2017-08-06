import React from 'react';
import { Tab } from 'semantic-ui-react';

import News from './News';
<<<<<<< HEAD
import HomePage from './HomePage';
import LiveDataTable from './LiveDataTable';

const panes = [
  { menuItem: 'Home', render: () => <HomePage /> },
  { menuItem: 'Live Data', render: () => <Tab.Pane attached={false}><LiveDataTable /></Tab.Pane> },
=======
import OrderBook from './LiveDataTable';

const panes = [
  { menuItem: 'Home', render: () => <Tab.Pane attached={false}>*Home page here*</Tab.Pane> },
  { menuItem: 'Order Book', render: () => <Tab.Pane attached={false}><OrderBook /></Tab.Pane> },
>>>>>>> small changes to menu
  { menuItem: 'Analytics', render: () => <Tab.Pane attached={false}>*Analytics here*</Tab.Pane> },
  { menuItem: 'News', render: () => <Tab.Pane attached={false}><News /></Tab.Pane> },
];

const MenuTab = () => (
  <Tab size="large" menu={{ inverted: true, size: 'large', attached: false }} panes={panes} />
);

export default MenuTab;
