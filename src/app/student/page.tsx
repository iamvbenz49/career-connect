'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Button } from '@/components/ui/button';

export default function StudentHomePage() {
  const router = useRouter();
  const [newsFeed, setNewsFeed] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await axios.get('/api/feed');
        console.log(res.data)
        setNewsFeed(res.data);
      } catch (err) {
        console.error('Failed to fetch news feed:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  return (
    <main className="min-h-screen bg-gray-100 p-6">
      <section className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Welcome Student 👋</h1>

        <p className="text-gray-600 mb-6">
          Connect with alumni, apply for referral-based jobs, and track your career progress.
        </p>

        {/* News Feed */}
        <div className="mb-10">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">📢 News Feed</h2>
          {loading ? (
            <p className="text-sm text-gray-500">Loading news...</p>
          ) : newsFeed.length === 0 ? (
            <p className="text-sm text-gray-500">No news right now.</p>
          ) : (
            <div className="space-y-4">
              {newsFeed.map((item, index) => (
                <div key={index} className="bg-white border-l-4 border-blue-500 p-4 rounded-md shadow-sm">
                  <div className="flex justify-between items-start">
                    <h3 className="text-lg font-medium text-gray-800">{item.title}</h3>
                    <span className="text-xs text-gray-400">{item.timestamp}</span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">{item.description}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Feature Cards */}
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2">
          <Card title="Find Alumni" desc="Connect with alumni from your college." link="/student/discovery" />
          <Card title="Referral Jobs" desc="Apply to jobs alumni are referring to." link="/student/jobs" />
          <Card title="Chat" desc="Start conversations with mentors." link="/student/chat" />
          <Card title="Career Copilot" desc="Get AI-powered job suggestions." link="/student/copilot" />
        </div>
      </section>
    </main>
  );
}

type CardProps = {
  title: string;
  desc: string;
  link: string;
};

function Card({ title, desc, link }: CardProps) {
  const router = useRouter();

  return (
    <div className="bg-white shadow-lg rounded-xl p-5 hover:shadow-xl transition-all">
      <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
      <p className="text-sm text-gray-600 mt-2">{desc}</p>
      <Button onClick={() => router.push(link)} className="mt-4">Go</Button>
    </div>
  );
}
