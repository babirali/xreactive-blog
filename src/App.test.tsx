// import React from 'react';
// import ReactDOM from 'react-dom';
// import App from './App';

// it('renders without crashing', () => {
//   const div = document.createElement('div');
//   ReactDOM.render(<App />, div);
//   ReactDOM.unmountComponentAtNode(div);
// });

// describe('Examining the syntax of Jest tests', () => {

//   it('sums numbers', () => {
//       expect(1 + 2).toEqual(3);
//       expect(2 + 2).toEqual(4);
//    });
// });

import React from "react";
import { shallow, mount } from "enzyme";
import App from "./App";

import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
configure({ adapter: new Adapter() });

describe("First React component test with Enzyme", () => {
  it("renders without crashing", () => {
    mount(<App />);
  });
});
