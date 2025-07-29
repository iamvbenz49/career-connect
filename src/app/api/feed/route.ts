import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongo';
import { Feed } from '@/lib/models/feed';



export async function GET() {
  try {
    await connectDB();

    const existing = await Feed.countDocuments();

    const news = await Feed.find();
    return NextResponse.json(news);
  } catch (err) {
    console.error('Error fetching news:', err);
    return NextResponse.json({ error: 'Failed to fetch news' }, { status: 500 });
  }
}
