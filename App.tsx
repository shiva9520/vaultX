import React from 'react';
import { Provider } from 'react-redux';
import { store, persistor } from './src/redux/store';
import { ThemeProvider } from './src/context/ThemeContext';
import Navigation from './src/navigation/Navigation';
import { PersistGate } from 'redux-persist/integration/react';
import { StatusBar } from 'react-native';

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider>
          <Navigation />
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;