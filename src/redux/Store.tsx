// store.ts
import { createStore } from 'redux';
import parkingReducer from './reducers/ParkReducers';
import { applyMiddleware } from '@reduxjs/toolkit';
import { thunk } from 'redux-thunk';

const loadState = () => {
  try {
    const parkingState = localStorage.getItem('parkingAppState');
    console.log('parkingAppState==>>', parkingState);
    if (parkingState === null) {
      return undefined;
    }
    return JSON.parse(parkingState);
  } catch (err) {
    console.error('Error loading state from localStorage:', err);
    return undefined;
  }
};

const saveState = (state: any) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('parking123State', serializedState);
  } catch (err) {
    console.error('Error saving state to localStorage:', err);
  }
};

const initialState = loadState();

const store = createStore(parkingReducer, initialState, applyMiddleware(thunk));

store.subscribe(() => {
  saveState(store.getState());
});

export default store;
