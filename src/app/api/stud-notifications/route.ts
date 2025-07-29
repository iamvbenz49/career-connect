// /app/api/notifications/[userId]/route.ts
import { connectDB } from '@/lib/mongo';
import Notification from '@/lib/models/notification';
import { NextResponse } from 'next/server';
import AlumniNotification from '@/lib/models/alum-notification';

interface Params {
  params: {
    userId: string;
  };
}

export async function GET(req: Request, { params }: Params) {
  await connectDB();

//   const { userId } = params;

  try {
    const notifications = await AlumniNotification.find().sort({ createdAt: -1 });
    return NextResponse.json(notifications);
  } catch (err) {
    console.error('❌ Failed to fetch notifications:', err);
    return NextResponse.json({ error: 'Failed to fetch notifications' }, { status: 500 });
  }
}
