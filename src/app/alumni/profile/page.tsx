'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { Briefcase, GraduationCap, UserRound, Wallet } from 'lucide-react';

interface Alumni {
  _id: string;
  name: string;
  email: string;
  graduation_year: number;
  degree: string;
  major: string;
  current_employer: string;
  job_title: string;
  company_history: string[];
  industry: string;
  skills: string[];
  areas_of_expertise: string[];
  willing_to_mentor: boolean;
  mentor_interests: string[];
  mentorship_sessions_given: number;
  referrals_given: number;
  wallet_address: string;
}

export default function AlumniProfile() {
  const [alumni, setAlumni] = useState<Alumni | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    axios.get('/api/alumni/6888a776448ce3b92d76b2be')
      .then(res => setAlumni(res.data))
      .catch(err => {
        console.error("Failed to fetch alumni data:", err);
        setError('Failed to load alumni profile.');
      });
  }, []);

  if (error) return <p className="p-10 text-center text-red-500">{error}</p>;
  if (!alumni) return <p className="p-10 text-center">Loading...</p>;

  return (
    <div className="max-w-4xl mx-auto py-10 px-6 bg-white shadow-md rounded-2xl min-h-screen">
      <div className="flex items-center gap-4 mb-6">
        <div className="bg-blue-100 text-blue-700 w-14 h-14 flex items-center justify-center rounded-full">
          <UserRound size={28} />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-800">{alumni.name}</h1>
          <p className="text-sm text-gray-500">{alumni.email}</p>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-6 text-sm text-gray-700 mb-8">
        <div>
          <h2 className="font-semibold text-gray-800 mb-1"><GraduationCap className="inline mr-2" size={16}/> Education</h2>
          <p>{alumni.degree} in {alumni.major}</p>
          <p className="text-xs text-gray-500">Class of {alumni.graduation_year}</p>
        </div>
        <div>
          <h2 className="font-semibold text-gray-800 mb-1"><Briefcase className="inline mr-2" size={16}/> Current Role</h2>
          <p>{alumni.job_title} at {alumni.current_employer}</p>
          <p className="text-xs text-gray-500">{alumni.industry}</p>
        </div>
        <div>
          <h2 className="font-semibold text-gray-800 mb-1">Company History</h2>
          <ul className="list-disc pl-4 space-y-1 text-xs">
            {alumni.company_history?.length ? (
              alumni.company_history.map((c, i) => <li key={i}>{c}</li>)
            ) : (
              <li>No data</li>
            )}
          </ul>
        </div>
        <div>
          <h2 className="font-semibold text-gray-800 mb-1">Mentorship</h2>
          <p>{alumni.willing_to_mentor ? '✅ Willing to Mentor' : '❌ Not Available for Mentorship'}</p>
          {alumni.willing_to_mentor && (
            <div className="text-xs text-gray-600 mt-1">
              Interests: {alumni.mentor_interests.join(', ') || 'None'}
              <br />
              Sessions Given: {alumni.mentorship_sessions_given}
            </div>
          )}
        </div>
        <div>
          <h2 className="font-semibold text-gray-800 mb-1">Skills</h2>
          <div className="flex flex-wrap gap-2 text-xs text-white">
            {alumni.skills.map((skill, i) => (
              <span key={i} className="bg-blue-600 px-2 py-1 rounded-lg">{skill}</span>
            ))}
          </div>
        </div>
        <div>
          <h2 className="font-semibold text-gray-800 mb-1">Expertise</h2>
          <p className="text-xs">{alumni.areas_of_expertise.join(', ') || 'N/A'}</p>
        </div>
        <div>
          <h2 className="font-semibold text-gray-800 mb-1">Referrals</h2>
          <p>{alumni.referrals_given} referrals given</p>
        </div>
        <div>
          <h2 className="font-semibold text-gray-800 mb-1"><Wallet className="inline mr-2" size={16}/> Wallet</h2>
          <p className="text-xs text-gray-500 break-words">{alumni.wallet_address || 'Not Connected'}</p>
        </div>
      </div>
    </div>
  );
}
