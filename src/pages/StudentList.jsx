// src/pages/StudentList.jsx
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApi } from '../hooks/useApi';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faHome, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

export default function StudentList() {
  const navigate = useNavigate();
  const { data: students, loading, error, refetch } = useApi('http://localhost:5000/students');

  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const studentsPerPage = 5;

  const handleDelete = (id) => {
    if (confirm('هل تريد حذف هذا الطالب؟')) {
      fetch(`http://localhost:5000/students/${id}`, { method: 'DELETE' })
        .then(() => refetch())
        .catch(() => alert('حدث خطأ أثناء الحذف'));
    }
  };

  const filteredStudents = (students || [])
    .filter((student) =>
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.grade.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (!sortField) return 0;
      if (sortField === 'age') return a.age - b.age;
      return a[sortField].localeCompare(b[sortField]);
    });

  const totalPages = Math.ceil(filteredStudents.length / studentsPerPage);
  const startIndex = (currentPage - 1) * studentsPerPage;
  const paginatedStudents = filteredStudents.slice(startIndex, startIndex + studentsPerPage);

  return (
    <div style={{ display: 'flex', justifyContent: 'center', padding: '2rem' }}>
      <div style={{ padding: '2rem', color: 'white', maxWidth: '800px', width: '90%' }}>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginBottom: '1rem' }}>
          <Link to="/"><button style={buttonStyle}><FontAwesomeIcon icon={faHome} /> Home page</button></Link>
          <Link to="/add"><button style={buttonStyle}><FontAwesomeIcon icon={faPlus} /> Add student</button></Link>
        </div>

        <h1 style={{ textAlign: 'center' }}> student managment</h1>

        <input
          type="text"
          placeholder="ابحث بالاسم أو العلامة..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
          style={searchInputStyle}
        />

        {loading ? (
          <p>جاري التحميل...</p>
        ) : error ? (
          <p style={{ color: 'red' }}>خطأ: {error.message}</p>
        ) : (
          <>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  <th onClick={() => setSortField('name')}>Name ⬍</th>
                  <th onClick={() => setSortField('age')}>age ⬍</th>
                  <th onClick={() => setSortField('grade')}>grade ⬍</th>
                  <th>procedure</th>
                </tr>
              </thead>
              <tbody>
                {paginatedStudents.map((student) => (
                  <tr key={student.id} style={{ textAlign: 'center' }}>
                    <td>{student.name}</td>
                    <td>{student.age}</td>
                    <td>{student.grade}</td>
                    <td>
                      <button style={iconBtnStyle} onClick={() => navigate(`/edit/${student.id}`)}>
                        <FontAwesomeIcon icon={faEdit} />
                      </button>{' '}
                      <button style={iconBtnStyle} onClick={() => handleDelete(student.id)}>
                        <FontAwesomeIcon icon={faTrash} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div style={{ marginTop: '1rem', display: 'flex', justifyContent: 'center', gap: '1rem' }}>
              <button onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))} disabled={currentPage === 1}>
                ⬅ prev
              </button>
              <span>page {currentPage} from {totalPages}</span>
              <button onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))} disabled={currentPage === totalPages}>
               Next➡
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

// أنماط الأزرار
const buttonStyle = {
  backgroundColor: '#333',
  color: '#fff',
  padding: '0.5rem 1rem',
  border: 'none',
  borderRadius: '8px',
  cursor: 'pointer',
  fontSize: '1rem'
};

const iconBtnStyle = {
  backgroundColor: '#444',
  color: 'white',
  border: 'none',
  borderRadius: '6px',
  padding: '6px 10px',
  cursor: 'pointer',
  fontSize: '1rem',
};

const searchInputStyle = {
  padding: '0.5rem',
  marginBottom: '1rem',
  width: '100%',
  borderRadius: '5px',
  border: '1px solid #444',
  backgroundColor: '#1e1e1e',
  color: '#fff',
};
