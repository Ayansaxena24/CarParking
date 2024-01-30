// ExitCar.test.tsx

import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/Store';
import ExitCar from './ExitCar';

// Mock fetch for testing purposes
// global.fetch = jest.fn(() =>
//   Promise.resolve({
//     ok: true,
//     json: () => Promise.resolve({}),
//   })
// );

// const mockState = {
//   parkingSpaces: [
//     {
//       id: 1,
//       registrationNumber: 'ABC123',
//       inTime: '08:00 AM',
//     },
//     // Add more mock data as needed
//   ],
// };

// const store = createStore(parkReducer, mockState);

test('renders ExitCar component with proper elements', () => {
  render(
    <Router>
      <Provider store={store}>
        <ExitCar />
      </Provider>
    </Router>
  );

  // Assert that elements in your ExitCar component are rendered
  expect(screen.getByText(/Back/i)).toBeInTheDocument();
  expect(screen.getByText(/Calculate Charge/i)).toBeInTheDocument();
  expect(screen.getByText(/Payment Taken/i)).toBeInTheDocument();
});

test('navigates back to SlotPage when Back button is clicked', () => {
  render(
    <Router>
      <Provider store={store}>
        <ExitCar />
      </Provider>
    </Router>
  );

  // Click on the Back button
  fireEvent.click(screen.getByText(/Back/i));

  // Assert that it navigates back to SlotPage
  expect(screen.getByText(/Welcome, Owner/i)).toBeInTheDocument();
});

test('calculates and displays charge amount correctly', async () => {
  render(
    <Router>
      <Provider store={store}>
        <ExitCar />
      </Provider>
    </Router>
  );

  // Click on the Calculate Charge button
  fireEvent.click(screen.getByText(/Calculate Charge/i));

  // Wait for the calculation to complete
  await waitFor(() => screen.getByText(/Charge Amount/i));

  // Assert that the charge amount is displayed correctly
  expect(screen.getByText(/Charge Amount: \$30/i)).toBeInTheDocument();
});

test('takes payment and deallocates space after successful payment', async () => {
  render(
    <Router>
      <Provider store={store}>
        <ExitCar />
      </Provider>
    </Router>
  );

  // Click on the Payment Taken button
  fireEvent.click(screen.getByText(/Payment Taken/i));

  // Wait for the payment process to complete
  await waitFor(() => screen.getByText(/Payment taken successfully!/i));

  // Assert that the parking space is deallocated
  expect(screen.getByText(/Welcome, Owner/i)).toBeInTheDocument();
});

// Add more test cases as needed for error scenarios, edge cases, etc.
