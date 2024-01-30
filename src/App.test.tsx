import { render } from '@testing-library/react';
import { Provider } from 'react-redux'; // Import the correct Provider component
// import { BrowserRouter as Router } from 'react-router-dom';
import store from './redux/Store'; // Import your Redux store
import App from './App';

test('renders learn react link', () => {
    const wrapper = render(
        <Provider store={store}> {/* Pass the store as a prop to the Provider component */}
            {/* <Router> */}
                <App />
            {/* </Router> */}
        </Provider>
    );

    expect(wrapper).toMatchSnapshot();
});
