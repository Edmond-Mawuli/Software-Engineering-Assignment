import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET() {
  try {
    const students = await prisma.students.findMany({
      take: 10, // limit if needed
    });

    return NextResponse.json(students);
  } catch (error) {
    return NextResponse.json({ error: 'Could not fetch students' }, { status: 500 });
  }
}