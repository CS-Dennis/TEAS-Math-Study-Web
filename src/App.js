import './App.css';
import { HashRouter, Route, Routes } from 'react-router-dom';
import Home from './Screens/Home';
import PracticeHome from './Screens/PracticeHome';
import ExamHome from './Screens/ExamHome';
import PracticeQuestions from './Screens/PracticeQuestions';
import PracticeReport from './Screens/PracticeReport';

function App() {
  return (
    <>
      <HashRouter basename={'/'}>
        <Routes>
          <Route path='/' element={<Home />} />

          <Route path='/practice' element={<PracticeHome />} />
          <Route path='/practice/questions' element={<PracticeQuestions />} />
          <Route path='/practice/report' element={<PracticeReport />} />

          <Route path='/exam' element={<ExamHome />} />
        </Routes>
      </HashRouter>
    </>
  );
}

export default App;
