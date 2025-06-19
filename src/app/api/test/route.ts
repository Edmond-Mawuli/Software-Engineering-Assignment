import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET() {
  try {
    // You can replace `students` with any real table in your DB
    const courses = await prisma.courses.findMany({
      take: 5, // limit result
    });

    return NextResponse.json(courses);
  } catch (error) {
    console.error('Failed to fetch from DB:', error);
    return NextResponse.json({ error: 'DB query failed' }, { status: 500 });
  }
}
