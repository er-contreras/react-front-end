import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';

import HelloWorld from './HelloWorld';
import configureStore from '../configureStore';

const store = configureStore();

const App = () => (
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element="Home!" />
        <Route path="/hello" element={<HelloWorld greetingFromApp="Friend" />} />
      </Routes>
    </BrowserRouter>
  </Provider>
);

export default App;
