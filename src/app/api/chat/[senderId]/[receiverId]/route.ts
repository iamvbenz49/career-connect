import Message from '@/lib/models/Message';
import { connectDB } from '@/lib/mongo';
import { NextResponse } from 'next/server';

// GET: Fetch messages between sender and receiver
export async function GET(req: Request, { params }: { params: { senderId: string; receiverId: string } }) {
  try {
    await connectDB();

    const { senderId, receiverId } =  params;
    if (!senderId || !receiverId) {
      return NextResponse.json({ error: 'Missing senderId or receiverId' }, { status: 400 });
    }

    const messages = await Message.find({
      $or: [
        { senderId, receiverId },
        { senderId: receiverId, receiverId: senderId },
      ],
    }).sort({ timestamp: 1 });

    return NextResponse.json(messages);
  } catch (err) {
    console.error('❌ Chat Fetch Error:', err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

// POST: Insert dummy or real message
export async function POST(req: Request) {
  try {
    await connectDB();

    const { senderId, receiverId, content } = await req.json();

    if (!senderId || !receiverId || !content) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
    }

    const message = await Message.create({
      senderId,
      receiverId,
      content,
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json(message, { status: 201 });
  } catch (err) {
    console.error('❌ Message Insert Error:', err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
