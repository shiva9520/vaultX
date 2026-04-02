import React from 'react';
import { Provider } from 'react-redux';
<<<<<<< HEAD
import { store, persistor } from './src/redux/store';
import { ThemeProvider } from './src/context/ThemeContext';
import Navigation from './src/navigation/Navigation';
import { PersistGate } from 'redux-persist/integration/react';

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider>
          <Navigation />
        </ThemeProvider>
      </PersistGate>
    </Provider>
=======
import { store } from './src/redux/store';
import { ThemeProvider } from './src/context/ThemeContext';
import Navigation from './src/navigation/Navigation';

const App = () => {
  return (
   <Provider store={store}>
  <ThemeProvider>
    <Navigation />
  </ThemeProvider>
</Provider>
>>>>>>> 31c1ef512a3a26754c201f44fe62cdb10dbb2b1b
  );
};

export default App;