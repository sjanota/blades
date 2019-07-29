import React from 'react';
import ReactDOM from 'react-dom';
import DistrictDetails from "./DistrictDetails";

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<DistrictDetails />, div);
  ReactDOM.unmountComponentAtNode(div);
});
