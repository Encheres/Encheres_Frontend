import { BrowserRouter } from 'react-router-dom';
import Main from './Components/Main';
import './App.css';
import Contactus from './Components/contact-us/Contactus'
function App() {
  return (
    <div className="App">
      {/* <BrowserRouter> */}
      <Main />
      {/* </BrowserRouter> */}
    </div>
  );
}

export default App;
