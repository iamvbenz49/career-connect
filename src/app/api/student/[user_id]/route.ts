import { connectDB } from '@/lib/mongo';
import Student from '@/lib/models/student';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  req: NextRequest,
  context: { params: { user_id: string } }
) {
  try {
    await connectDB();

    const { user_id } = context.params;
    const student = await Student.findOne({ user_id });

    if (!student) {
      return NextResponse.json({ error: 'Student not found' }, { status: 404 });
    }

    return NextResponse.json(student);
  } catch (err) {
    console.error('❌ API Error:', err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
