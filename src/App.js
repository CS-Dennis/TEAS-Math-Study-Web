import './App.css';
import { HashRouter, Route, Routes } from 'react-router-dom';
import Home from './Screens/Home';
import Practice from './Screens/Practice';
import Exam from './Screens/Exam';

function App() {
  return (
    <>
      <HashRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/practice' element={<Practice />} />
          <Route path='/exam' element={<Exam />} />
        </Routes>
      </HashRouter>
    </>
  );
}

export default App;
