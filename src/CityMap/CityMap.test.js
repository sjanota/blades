import React from 'react';
import ReactDOM from 'react-dom';
import CityMap from "./CityMap";

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<CityMap />, div);
  ReactDOM.unmountComponentAtNode(div);
});
