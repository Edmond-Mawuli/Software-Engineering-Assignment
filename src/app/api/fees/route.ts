import { prisma } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const result = await prisma.$queryRawUnsafe<{ get_outstanding_fees: any }[]>(`
      SELECT get_outstanding_fees()
    `);

    // Directly return the object
    return NextResponse.json(result[0].get_outstanding_fees);
  } catch (error) {
    console.error('Error fetching fees:', error);
    return NextResponse.json({ error: 'Failed to fetch fees' }, { status: 500 });
  }
}
