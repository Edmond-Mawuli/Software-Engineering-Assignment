import { prisma } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const enrollments = await prisma.course_enrollments.findMany({
      include: {
        students: {
          select: { student_id: true, full_name: true }
        },
        courses: {
          select: {
            course_code: true,
            course_name: true,
          }
        }
      }
    });

    const result = enrollments.map((e) => ({
      enrollment_id: e.enrollment_id,
      student_id: e.students?.student_id ?? 'N/A',
      student_name: e.students?.full_name ?? 'N/A',
      course_code: e.courses?.course_code ?? 'N/A',
      course_name: e.courses?.course_name ?? 'N/A',
      semester: e.semester ?? '',
      academic_year: e.academic_year ?? '',
    }));

    return NextResponse.json(result);
  } catch (error) {
    console.error('Error fetching enrollments:', error);
    return NextResponse.json({ error: 'Failed to load enrollments' }, { status: 500 });
  }
}
