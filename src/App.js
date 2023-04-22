import './App.css';
import { HashRouter, Route, Routes } from 'react-router-dom';
import Home from './Screens/Home';

function App() {
  return (
    <>
      <HashRouter>
        <Routes>
          <Route path='/' element={<Home />} />
        </Routes>
      </HashRouter>
    </>
  );
}

export default App;
