import './App.css';
import { HashRouter, Route, Routes } from 'react-router-dom';
import Home from './Screens/Home';
import PracticeHome from './Screens/PracticeHome';
import ExamHome from './Screens/ExamHome';
import PracticeQuestions from './Screens/PracticeQuestions';

function App() {
  return (
    <>
      <HashRouter>
        <Routes>
          <Route path='/' element={<Home />} />

          <Route path='/practice' element={<PracticeHome />} />
          <Route path='/practice/questions' element={<PracticeQuestions />} />

          <Route path='/exam' element={<ExamHome />} />
        </Routes>
      </HashRouter>
    </>
  );
}

export default App;
