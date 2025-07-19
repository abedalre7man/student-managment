// src/pages/EditStudent.jsx
import { useState, useEffect, useContext } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { StudentContext } from '../context/StudentContext';

export default function EditStudent() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { students, updateStudent } = useContext(StudentContext);

  const [student, setStudent] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const target = students.find((s) => s.id === Number(id));
    if (!target) {
      navigate('/');
    } else {
      setStudent({ ...target });
    }
  }, [id, students, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (student.name.trim().length < 3) return setError('Name too short.');
    const numericAge = Number(student.age);
    if (isNaN(numericAge) || numericAge < 5 || numericAge > 100) return setError('Invalid age.');
    const allowedGrades = ['A+', 'A', 'B+', 'B', 'C+', 'C', 'D', 'F'];
    if (!allowedGrades.includes(student.grade)) return setError('Invalid grade.');

    updateStudent(student); // التعديل عن طريق StudentContext
    navigate('/');
  };

  if (!student) return <p style={{ color: 'white' }}>Loading...</p>;

  return (
    <div style={{ padding: '2rem', color: 'white' }}>
      <h2>تعديل طالب</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit} style={{ maxWidth: '400px', margin: 'auto' }}>
        <label>Name:</label>
        <input
          value={student.name}
          onChange={(e) => setStudent({ ...student, name: e.target.value })}
          required
        />
        <label>Age:</label>
        <input
          value={student.age}
          onChange={(e) => setStudent({ ...student, age: e.target.value })}
          type="number"
          required
        />
        <label>Grade:</label>
        <input
          value={student.grade}
          onChange={(e) => setStudent({ ...student, grade: e.target.value.toUpperCase() })}
          required
        />
        <div style={{ marginTop: '1rem' }}>
          <button type="submit" style={{ marginRight: '10px' }}>Update</button>
          <Link to="/"><button type="button">Cancel</button></Link>
        </div>
      </form>
    </div>
  );
}
