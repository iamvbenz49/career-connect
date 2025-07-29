import { connectDB } from '@/lib/mongo';
import AlumniStudent from '@/lib/models/alumnistudent';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

interface Params {
  params: {
    id: string;
  };
}

export async function GET(req: NextRequest, { params }: Params) {
  try {
    await connectDB();

    const student = await AlumniStudent.findById(params.id);
    if (!student) {
      return NextResponse.json({ error: 'Student not found' }, { status: 404 });
    }

    return NextResponse.json(student);
  } catch (err) {
    console.error('❌ GET /api/alumnistudent/[id] error:', err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}