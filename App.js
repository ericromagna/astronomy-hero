import React, {useState} from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from './reducers/root-reducer'
import Index from './index';

const store = createStore(rootReducer);

export default function App() {
  return (
    <Provider store={store}><Index /></Provider>
  );
}
