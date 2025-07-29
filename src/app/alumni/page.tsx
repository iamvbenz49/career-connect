'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';

export default function StudentHomePage() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-gray-100 p-6">
      <section className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Welcome Student 👋</h1>

        <p className="text-gray-600 mb-8">
          Connect with alumni, apply for referral-based jobs, and track your career progress.
        </p>

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
