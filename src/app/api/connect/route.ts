import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongo';
import Alumni from '@/lib/models/alumni';
import Student from '@/lib/models/student';

export async function POST(req: Request) {
  try {
    await connectDB();
    const { studentId, alumniId } = await req.json();

    const student = await Student.findOne({ user_id: studentId });
    const alumni = await Alumni.findById(alumniId);

    if (!student || !alumni) {
      return NextResponse.json({ error: 'Student or Alumni not found' }, { status: 404 });
    }

    const alreadyConnected = student.connections.includes(alumni._id);
    if (alreadyConnected) {
      return NextResponse.json({ message: 'Already connected.' });
    }

    student.connections.push(alumni._id);
    await student.save();

    return NextResponse.json({ message: 'Connection saved successfully.' });
  } catch (err) {
    console.error('Connection error:', err);
    return NextResponse.json({ error: 'Connection failed' }, { status: 500 });
  }
}
