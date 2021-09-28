import React from 'react'
import { BrowserRouter } from 'react-router-dom';
import Main from './Components/Main';
import './App.css';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Main/>
      </BrowserRouter>
    </div>
  );
}

export default App;
