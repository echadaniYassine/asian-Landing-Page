// App.js
import { Provider } from 'react-redux';
import store from './Reducers/storeCarte';
import RouteLays from './routes';

function App() {
  return (
    <Provider store={store}>
      <RouteLays />
    </Provider>
  );
}

export default App;
