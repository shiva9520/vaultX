import React from 'react';
import { Provider } from 'react-redux';
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
  );
};

export default App;