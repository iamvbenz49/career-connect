// /app/api/alumnistudent/route.ts
import { connectDB } from '@/lib/mongo';
import AlumniStudent from '@/lib/models/alumnistudent';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    await connectDB();
    const students = await AlumniStudent.find();
    return NextResponse.json(students);
  } catch (error) {
    console.error('Error fetching students:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
