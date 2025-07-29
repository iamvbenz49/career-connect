import { connectDB } from '@/lib/mongo';
import Message from '@/lib/models/Message';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  await connectDB();
  const body = await req.json();
  const saved = await Message.create(body);
  return NextResponse.json(saved);
}
