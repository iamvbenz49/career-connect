// app/profile/page.tsx
'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { Briefcase, GraduationCap, MapPin, Link } from 'lucide-react';

export default function StudentProfile() {
  const [student, setStudent] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('/api/student/student_colab1')
      .then((res) => setStudent(res.data))
      .catch((err) => console.error('Error fetching student:', err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="p-10 text-center text-gray-400 animate-pulse">Loading profile...</p>;
  if (!student) return <p className="p-10 text-center text-red-400">No student found.</p>;

  return (
    <div className="min-h-screen py-10 px-6 bg-white border border-gray-200 shadow-xl">
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 mb-10">
        <div className="w-28 h-28 bg-gray-100 rounded-full overflow-hidden flex items-center justify-center shadow-md">
          <img
            src={student.image || 'https://ui-avatars.com/api/?name=' + encodeURIComponent(student.name)}
            alt={student.name}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="text-center sm:text-left">
          <h1 className="text-3xl font-bold text-gray-900">{student.name}</h1>
          <p className="text-sm text-gray-600 mt-1">{student.email}</p>
          <p className="text-sm text-gray-600 flex items-center gap-2 justify-center sm:justify-start mt-2">
            <GraduationCap className="w-4 h-4" /> {student.degree} in {student.major}, {student.graduation_year}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <ProfileBlock title="Skills" items={student.skills} />
        <ProfileBlock title="Projects" items={student.projects} />
        <ProfileBlock title="Internships" items={student.past_internships} icon={<Briefcase className="w-4 h-4" />} />
        <ProfileBlock title="Career Goals" items={student.career_goals} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gray-50 p-5 rounded-xl border border-gray-100 shadow-sm">
          <h3 className="text-sm font-semibold text-gray-700 mb-3">Resume Snapshot</h3>
          <p className="text-sm text-gray-600 line-clamp-3">
            {student.resume_text?.split('. ').slice(0, 2).join('. ') + '.'}
          </p>
        </div>
        <div className="bg-gray-50 p-5 rounded-xl border border-gray-100 shadow-sm">
          <h3 className="text-sm font-semibold text-gray-700 mb-3">Contact & Links</h3>
          <ul className="text-sm text-gray-600 space-y-2">
            {student.location_preference?.length > 0 && (
              <li className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-gray-500" /> {student.location_preference[0]}
              </li>
            )}
            {student.linkedin_url && (
              <li>
                <a href={student.linkedin_url} target="_blank" rel="noopener noreferrer" className="flex items-center text-blue-600 hover:underline">
                  <Link className="w-4 h-4 mr-1" /> LinkedIn Profile
                </a>
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}

function ProfileBlock({ title, items, icon }: { title: string; items: string[]; icon?: React.ReactNode }) {
  if (!items?.length) return null;

  return (
    <div className="bg-gray-50 p-5 rounded-xl border border-gray-100 shadow-sm">
      <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
        {icon} {title}
      </h3>
      <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
        {items.slice(0, 4).map((item, idx) => <li key={idx}>{item}</li>)}
      </ul>
    </div>
  );
}