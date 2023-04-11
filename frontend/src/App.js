import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Detail from "./pages/Detail.js";
import Prehled from "./pages/Prehled.js"
import Navbar from './components/Navbar';

function App() {

  return (
      <div className="App">

        <Router basename={'/pohotovost'}>
          <Navbar />
          <Routes>
            <Route exact path='/' element={<Prehled />}></Route>
            <Route exact path='detail' element={<Detail />}></Route>
          </Routes>
        </Router>

      </div>
  );
}

export default App;
