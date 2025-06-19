'use client';

import { useEffect, useState } from 'react';

type Student = {
  student_id: number;
  full_name: string;
  email: string;
  program: string;
  level: number;
};

type Enrollment = {
  enrollment_id: number;
  student_id: number | string;
  student_name: string;
  course_code: string;
  course_name: string;
  semester: string;
  academic_year: string;
};


type FeeData = {
  student_id: number;
  full_name: string;
  total_paid: number;
  outstanding_fees: number;
};

export default function DashboardPage() {
  const [students, setStudents] = useState<Student[]>([]);
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [fees, setFees] = useState<FeeData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAll() {
      const [studentsRes, enrollmentsRes, feesRes] = await Promise.all([
        fetch('/api/students'),
        fetch('/api/enrollments'),
        fetch('/api/fees'),
      ]);

      const studentsData = await studentsRes.json();
      const enrollmentsData = await enrollmentsRes.json();
      const feesData = await feesRes.json();

      setStudents(studentsData);
      setEnrollments(enrollmentsData);
      setFees(feesData);
      setLoading(false);
    }

    fetchAll();
  }, []);

  if (loading) return <p className="p-4">Loading dashboard...</p>;

  return (
    <div className="p-6 space-y-8">
      <h1 className="text-3xl font-bold">Computer Engineering Dashboard</h1>

      {/* Students */}
      <div>
        <h2 className="text-xl font-semibold mb-2">Students</h2>
        <table className="min-w-full border text-left">
          <thead>
            <tr>
              <th className="border px-4 py-2">ID</th>
              <th className="border px-4 py-2">Full Name</th>
              <th className="border px-4 py-2">Email</th>
              <th className="border px-4 py-2">Program</th>
              <th className="border px-4 py-2">Level</th>
            </tr>
          </thead>
          <tbody>
            {students.map((s) => (
              <tr key={s.student_id}>
                <td className="border px-4 py-2">{s.student_id}</td>
                <td className="border px-4 py-2">{s.full_name}</td>
                <td className="border px-4 py-2">{s.email}</td>
                <td className="border px-4 py-2">{s.program}</td>
                <td className="border px-4 py-2">{s.level}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

{/* Enrollments */}
<div>
  <h2 className="text-xl font-semibold mb-2">Course Enrollments</h2>
  <table className="min-w-full border text-left">
    <thead>
      <tr>
        <th className="border px-4 py-2">Enrollment ID</th>
        <th className="border px-4 py-2">Student ID</th>
        <th className="border px-4 py-2">Student Name</th>
        <th className="border px-4 py-2">Course Code</th>
        <th className="border px-4 py-2">Course Name</th>
        <th className="border px-4 py-2">Semester</th>
        <th className="border px-4 py-2">Academic Year</th>
      </tr>
    </thead>
    <tbody>
      {enrollments.map((e) => (
        <tr key={e.enrollment_id}>
          <td className="border px-4 py-2">{e.enrollment_id}</td>
          <td className="border px-4 py-2">{e.student_id}</td>
          <td className="border px-4 py-2">{e.student_name}</td>
          <td className="border px-4 py-2">{e.course_code}</td>
          <td className="border px-4 py-2">{e.course_name}</td>
          <td className="border px-4 py-2">{e.semester}</td>
          <td className="border px-4 py-2">{e.academic_year}</td>
        </tr>
      ))}
    </tbody>
  </table>
</div>


      {/* Fees */}
      <div>
        <h2 className="text-xl font-semibold mb-2">Outstanding Fees</h2>
        <table className="min-w-full border text-left">
          <thead>
            <tr>
              <th className="border px-4 py-2">Student ID</th>
              <th className="border px-4 py-2">Full Name</th>
              <th className="border px-4 py-2">Total Paid</th>
              <th className="border px-4 py-2">Outstanding</th>
            </tr>
          </thead>
          <tbody>
            {fees.map((f) => (
              <tr key={f.student_id}>
                <td className="border px-4 py-2">{f.student_id}</td>
                <td className="border px-4 py-2">{f.full_name}</td>
                <td className="border px-4 py-2">₵{f.total_paid}</td>
                <td className="border px-4 py-2">₵{f.outstanding_fees}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
