
import { connectDB } from '@/lib/mongo';
import Alumni from '@/lib/models/alumni';
import Job from '@/lib/models/job';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    await connectDB();

    // Only alumni willing to mentor
    const alumni = await Alumni.find({ willing_to_mentor: true }).limit(10);

    // Jobs that are open for referral
    const jobs = await Job.find({ referral_status: 'open' }).limit(10).sort({ createdAt: -1 });

    return NextResponse.json({ alumni, jobs });
  } catch (error) {
    console.error('Discovery fetch failed:', error);
    return NextResponse.json({ error: 'Failed to load discovery data' }, { status: 500 });
  }
}
