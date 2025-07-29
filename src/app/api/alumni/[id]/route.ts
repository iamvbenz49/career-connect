import { connectDB } from '@/lib/mongo';
import Alumni from '@/lib/models/alumni';
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
    const alumni = await Alumni.findById(params.id);
    if (!alumni) {
      return NextResponse.json({ error: 'Alumni not found' }, { status: 404 });
    }
    return NextResponse.json(alumni);
  } catch (err) {
    console.error('❌ GET /api/alumni/[id] error:', err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
