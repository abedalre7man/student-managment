// src/pages/AddStudent.jsx
import { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { StudentContext } from '../context/StudentContext';

export default function AddStudent() {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [grade, setGrade] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { addStudent } = useContext(StudentContext); // استخدام الدالة من السياق

  const handleSubmit = (e) => {
    e.preventDefault();

    if (name.trim().length < 3) return setError('Name must be at least 3 characters.');
    const numericAge = Number(age);
    if (isNaN(numericAge) || numericAge < 5 || numericAge > 100) return setError('Invalid age.');
    const allowedGrades = ['A+', 'A', 'B+', 'B', 'C+', 'C', 'D', 'F'];
    if (!allowedGrades.includes(grade)) return setError('Invalid grade.');

    const newStudent = {
      name,
      age: numericAge,
      grade: grade.toUpperCase(),
    };

    addStudent(newStudent); // أضف الطالب عبر الـ Context
    navigate('/');
  };

  return (
    <div style={{ padding: '2rem', color: 'white' }}>
      <h2>إضافة طالب جديد</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit} style={{ maxWidth: '400px', margin: 'auto' }}>
        <label>Name:</label>
        <input value={name} onChange={(e) => setName(e.target.value)} required />
        <label>Age:</label>
        <input value={age} onChange={(e) => setAge(e.target.value)} type="number" required />
        <label>Grade:</label>
        <input value={grade} onChange={(e) => setGrade(e.target.value.toUpperCase())} required />
        <div style={{ marginTop: '1rem' }}>
          <button type="submit" style={{ marginRight: '10px' }}>Add</button>
          <Link to="/"><button type="button">Cancel</button></Link>
        </div>
      </form>
    </div>
  );
}
