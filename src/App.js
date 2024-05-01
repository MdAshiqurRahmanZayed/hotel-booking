import './App.css';
import Main from './components/Main';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  Provider
} from 'react-redux'; 
import store from './redux/store';
import { BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <div className="App">
        <Provider store={store}>
          <BrowserRouter>
            <Main/>
          </BrowserRouter>
       </Provider>
    </div>
  );
}

export default App;
