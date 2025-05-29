import { Routes, Route } from 'react-router-dom'
import Home from './components/Home/Home';
import LoginUI from './components/login/LoginUI';
import RegisterUI from './components/register/RegisterUI';
import StudentsTable from './components/StudentsTable/StudentsTable';
import StudentForm from './components/StudentForm/StudentForm';
import PageNotFound from './components/PageNotFound/PageNotFound';
import Layout from './pages/index';
import './App.css'

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<LoginUI />} />
        <Route path="/register" element={<RegisterUI />} />
        <Route element={<Layout />}>
          <Route path="/home" element={<Home />} />

          {/* Rotas dos Estudantes */}
          <Route path="/students">
            <Route index element={<StudentsTable />} />
            <Route path="create" element={<StudentForm />} />
            <Route path="edit/:id" element={<StudentForm />} />
          </Route>

          {/* Rotas das Disciplinas */}
          <Route path="/subjects">
          </Route>

          {/* Rotas dos Professores */}
          <Route path="/teachers">
          </Route>
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  )
}

export default App
