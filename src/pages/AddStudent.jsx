// src/pages/AddStudent.jsx
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

export default function AddStudent() {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [grade, setGrade] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const allowedGrades = ['A+', 'A', 'B+', 'B', 'C+', 'C', 'D', 'F'];

  const handleSubmit = (e) => {
    e.preventDefault();

    // التحقق من صحة البيانات
    if (name.trim().length < 3) {
      setError('الاسم يجب أن يكون على الأقل 3 أحرف.');
      return;
    }

    const numericAge = Number(age);
    if (isNaN(numericAge) || numericAge < 5 || numericAge > 100) {
      setError('العمر يجب أن يكون رقمًا بين 5 و 100.');
      return;
    }

    if (!allowedGrades.includes(grade)) {
      setError('العلامة غير صالحة. استخدم A+, A, B+, ... F');
      return;
    }

    const newStudent = { name, age: numericAge, grade };

    fetch('http://localhost:5000/students', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newStudent)
    })
      .then((res) => {
        if (!res.ok) throw new Error('فشل في الإرسال');
        return res.json();
      })
      .then(() => {
        navigate('/');
      })
      .catch((err) => {
        setError('حدث خطأ أثناء الإضافة.');
        console.error(err);
      });
  };

  return (
    <div style={{ padding: '2rem', color: 'white' }}>
      <h2>إضافة طالب جديد</h2>

      <form onSubmit={handleSubmit} style={{ maxWidth: '400px', margin: 'auto' }}>
        {error && <p style={{ color: 'red' }}>{error}</p>}

        <div style={{ marginBottom: '1rem' }}>
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{ width: '100%', padding: '0.5rem' }}
            required
          />
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <label>age:</label>
          <input
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            style={{ width: '100%', padding: '0.5rem' }}
            required
          />
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <label>grade:</label>
          <input
            type="text"
            value={grade}
            onChange={(e) => setGrade(e.target.value.toUpperCase())}
            placeholder="مثلاً: A+, B, F"
            style={{ width: '100%', padding: '0.5rem' }}
            required
          />
        </div>

        <button type="submit">Add</button>{' '}
        <Link to="/"><button type="button">cancel</button></Link>
      </form>
    </div>
  );
}
