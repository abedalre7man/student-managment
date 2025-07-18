import { Routes, Route } from 'react-router-dom';
import StudentList from './pages/StudentList';
import AddStudent from './pages/AddStudent';
import EditStudent from './pages/EditStudent';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<StudentList />} />
      <Route path="/add" element={<AddStudent />} />
      <Route path="/edit/:id" element={<EditStudent />} />
    </Routes>
  );
}
