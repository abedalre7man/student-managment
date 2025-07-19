// ✅ StudentContext.jsx (تم تعديل التخزين المحلي)
import { createContext, useState, useEffect } from 'react';

export const StudentContext = createContext();

export function StudentProvider({ children }) {
  const [students, setStudents] = useState([]);

  // قراءة الطلاب من localStorage عند أول تحميل
  useEffect(() => {
    const stored = localStorage.getItem('students');
    if (stored) {
      setStudents(JSON.parse(stored));
    } else {
      // بيانات مبدئية فقط إذا ما في بيانات محفوظة
      const initial = [
        { id: 1, name: 'Alice', age: 20, grade: 'A' },
        { id: 2, name: 'Bob', age: 22, grade: 'B' },
        { id: 3, name: 'Charlie', age: 18, grade: 'C+' }
      ];
      setStudents(initial);
      localStorage.setItem('students', JSON.stringify(initial));
    }
  }, []);

  // كل ما تغيرت قائمة الطلاب، خزّنهم في localStorage
  useEffect(() => {
    localStorage.setItem('students', JSON.stringify(students));
  }, [students]);

  const addStudent = (student) => {
    const newStudent = {
      ...student,
      id: new Date().getTime() + Math.floor(Math.random() * 1000)
    };
    setStudents(prev => [...prev, newStudent]);
  };

  const updateStudent = (updatedStudent) => {
    setStudents(prev =>
      prev.map(student =>
        student.id === updatedStudent.id ? updatedStudent : student
      )
    );
  };

  const deleteStudent = (id) => {
    setStudents(prev => prev.filter(student => student.id !== id));
  };

  return (
    <StudentContext.Provider value={{ students, addStudent, updateStudent, deleteStudent }}>
      {children}
    </StudentContext.Provider>
  );
}
