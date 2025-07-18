// src/pages/EditStudent.jsx
import { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';

export default function EditStudent() {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [grade, setGrade] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { id } = useParams();

  const allowedGrades = ['A+', 'A', 'B+', 'B', 'C+', 'C', 'D', 'F'];

  // جلب بيانات الطالب
  useEffect(() => {
    fetch(`http://localhost:5000/students/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error('تعذر جلب بيانات الطالب');
        return res.json();
      })
      .then((data) => {
        setName(data.name);
        setAge(data.age);
        setGrade(data.grade);
      })
      .catch((err) => {
        setError(`خطأ أثناء التحميل: ${err.message}`);
        console.error(err);
      });
  }, [id]);

  // عند الضغط على زر "تعديل"
  const handleSubmit = (e) => {
    e.preventDefault();

    // تحقق من البيانات
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

    const updatedStudent = { name, age: numericAge, grade };

    fetch(`http://localhost:5000/students/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedStudent),
    })
      .then((res) => {
        if (!res.ok) throw new Error('فشل في التحديث');
        return res.json();
      })
      .then(() => {
        navigate('/');
      })
      .catch((err) => {
        setError('حدث خطأ أثناء التعديل.');
        console.error(err);
      });
  };

  return (
    <div style={{ padding: '2rem', color: 'white' }}>
      <h2>تعديل بيانات الطالب</h2>

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

        <button type="submit">edit</button>{' '}
        <Link to="/"><button type="button">cancel</button></Link>
      </form>
    </div>
  );
}
