
import React from 'react';
import Nav from '../src/components/Nav';
import Footer from './components/Footer/Footer';
import './style/Main/style.scss'
import { AppProvider } from './context/app.context';

import { Outlet } from 'react-router-dom';

const App = () => {
  return (
    <AppProvider>
      <div className="App">
        <div className="App-header">
          <Nav />
        </div>
        <div className="App-body">
          <Outlet />
        </div >
        <div className="App-footer">
          <Footer />
        </div>
      </div >
    </AppProvider>
  );
}

export default App;
