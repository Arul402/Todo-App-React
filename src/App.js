// import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router,Routes,Route } from 'react-router-dom'
import Login from './Components/Login';
import Signup from './Components/Signup';
import Home from './Components/Home';
import Update from './Components/Update';
// import Tailwind from './TailwindCSS/Tailwind';

function App() {
  return (
    <div className="App">
      <Router>
          <Routes>
            <Route path='/' element={<Login/>}/>
            <Route path='/signup' element={<Signup/>}/>
            <Route path='/home' element={<Home/>}/>
            <Route path='/update/:id' element={<Update/>}/>
          </Routes>
      </Router>
    </div>
  );
}

export default App;
