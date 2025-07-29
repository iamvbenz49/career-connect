'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import axios from 'axios';
import { ExternalLink } from 'lucide-react';
// import { getReferralContract } from '@/lib/contract'; // adjust path if needed

interface Referral {
  alumni_name: string;
  status: 'Selected' | 'Rejected' | 'Pending';
}

interface Project {
  title: string;
  link: string;
  description: string;
}

interface Student {
  _id: string;
  name: string;
  email: string;
  university: string;
  graduation_year: number;
  degree: string;
  major: string;
  cgpa: number;
  portfolio_url: string;
  resume_url: string;
  github: string;
  linkedin: string;
  skills: string[];
  tech_rating: number;
  behavior_rating: number;
  hackathons_participated: number;
  open_source_contributions: number;
  referrals: Referral[];
  projects: Project[];
  SucessRate: number;
  IsHirableforthisRole: string;
}

export default function StudentDetail() {
  const { id } = useParams<{ id: string }>();
  const [student, setStudent] = useState<Student | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!id) return;
    axios.get(`/api/alumnistudent/${id}`)
      .then(res => setStudent(res.data))
      .catch(err => console.error("Failed to load student:", err));
  }, [id]);

  const handleReferStudent = async () => {
    // Blockchain referral logic goes here
  };

  if (!student) return <p className="p-10 text-center">Loading...</p>;

  return (
    <div className="max-w-5xl mx-auto py-10 px-6 bg-white shadow-xl rounded-3xl min-h-screen">
      {/* Header */}
      <div className="mb-6 border-b pb-6">
        <h1 className="text-4xl font-bold text-gray-800">{student.name}</h1>
        <p className="text-gray-500 text-sm">{student.email}</p>
        <p className="text-gray-700 mt-1">{student.degree} in {student.major}, {student.university}</p>
        <p className="text-xs text-gray-500">Graduation Year: {student.graduation_year} | CGPA: {student.cgpa}</p>
      </div>

      {/* Success Rate & Hirable */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-6 mb-10 text-sm">
        <div className="bg-green-50 p-4 rounded-xl">
          <h2 className="font-semibold text-gray-700 mb-1">Success Rate</h2>
          <p>{student.SucessRate}%</p>
        </div>
        <div className="bg-green-50 p-4 rounded-xl">
          <h2 className="font-semibold text-gray-700 mb-1">Is Hirable For This Role?</h2>
          <p>{student.IsHirableforthisRole}</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-6 mb-10 text-sm">
        <div className="bg-gray-50 p-4 rounded-xl">
          <h2 className="font-semibold text-gray-700 mb-1">Technical Rating</h2>
          <p>{student.tech_rating} / 5</p>
        </div>
        <div className="bg-gray-50 p-4 rounded-xl">
          <h2 className="font-semibold text-gray-700 mb-1">Behavioral Rating</h2>
          <p>{student.behavior_rating} / 5</p>
        </div>
        <div className="bg-gray-50 p-4 rounded-xl">
          <h2 className="font-semibold text-gray-700 mb-1">Hackathons Participated</h2>
          <p>{student.hackathons_participated}</p>
        </div>
        <div className="bg-gray-50 p-4 rounded-xl">
          <h2 className="font-semibold text-gray-700 mb-1">Open Source Contributions</h2>
          <p>{student.open_source_contributions}</p>
        </div>
      </div>

      {/* Skills */}
      <div className="mb-10">
        <h2 className="text-xl font-semibold text-gray-800 mb-3">Top Skills</h2>
        <div className="flex flex-wrap gap-2">
          {student.skills.map((skill, i) => (
            <span key={i} className="bg-blue-600 text-white text-xs px-3 py-1 rounded-full shadow">{skill}</span>
          ))}
        </div>
      </div>

      {/* Projects */}
      <div className="mb-10">
        <h2 className="text-xl font-semibold text-gray-800 mb-3">Projects</h2>
        <ul className="space-y-4 text-sm">
          {student.projects.map((proj, i) => (
            <li key={i} className="border rounded-lg p-4 bg-gray-50">
              <a href={proj.link} target="_blank" rel="noreferrer" className="text-blue-700 font-medium hover:underline flex items-center gap-1">
                {proj.title} <ExternalLink size={14} />
              </a>
              <p className="text-gray-600 mt-1">{proj.description}</p>
            </li>
          ))}
        </ul>
      </div>

      {/* Referrals */}
      <div className="mb-10">
        <h2 className="text-xl font-semibold text-gray-800 mb-3">Referral History</h2>
        <ul className="space-y-2 text-sm">
          {student.referrals?.length > 0 ? student.referrals.map((r, idx) => (
            <li key={idx} className="flex justify-between border-b pb-1">
              <span className="text-gray-700">{r.alumni_name}</span>
              <span className={`font-medium ${
                r.status === 'Selected'
                  ? 'text-green-600'
                  : r.status === 'Rejected'
                  ? 'text-red-500'
                  : 'text-yellow-600'
              }`}>
                {r.status}
              </span>
            </li>
          )) : (
            <li className="text-gray-400 italic">No referral requests yet.</li>
          )}
        </ul>
      </div>

      {/* Links */}
      <div className="mb-12">
        <h2 className="text-xl font-semibold text-gray-800 mb-3">Links</h2>
        <ul className="space-y-1 text-sm">
          <li><a href={student.portfolio_url} className="text-blue-600 hover:underline" target="_blank">🌐 Portfolio</a></li>
          <li><a href={student.resume_url} className="text-blue-600 hover:underline" target="_blank">📄 Resume</a></li>
          <li><a href={student.github} className="text-blue-600 hover:underline" target="_blank">💻 GitHub</a></li>
          <li><a href={student.linkedin} className="text-blue-600 hover:underline" target="_blank">🔗 LinkedIn</a></li>
        </ul>
      </div>

      {/* Refer Button */}
      <div className="text-center">
        <button
          onClick={handleReferStudent}
          disabled={loading}
          className="bg-gradient-to-r w-50 from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white px-6 py-2.5 rounded-xl text-sm font-medium shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Submitting...' : '🚀 Refer This Student'}
        </button>
      </div>
    </div>
  );
}
