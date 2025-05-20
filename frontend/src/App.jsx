import { Routes, Route } from 'react-router-dom'
import Home from './pages/index';
import LoginUI from './components/login/LoginUI';
import StudentsTable from './components/StudentsTable/StudentsTable';
import './App.css'

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<LoginUI />} />
        <Route path="/home" element={<Home />} />

        {/* Rotas dos Estudantes */}
        <Route path="/students" element={<StudentsTable />} />

       {/* <Route path="/subjects" element={<Disciplinas />} />
        <Route path="/teachers" element={<Professores />} />*/}
      </Routes>
    </>
  )
}

export default App
