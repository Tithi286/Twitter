import React from 'react';
import logo from './logo.svg';
import './App.css';
import Main from './components/Main';
import {BrowserRouter} from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
        <div>
          {/* App Component Has a Child Component called Main*/}
          <Main/>
        </div>
      </BrowserRouter>
  );
}

export default App;
