'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import axios from 'axios';
import { UserRound } from 'lucide-react';

interface Student {
  _id: string;
  name: string;
  degree: string;
  major: string;
  skills: string[];
}

export default function DiscoverStudents() {
  const [students, setStudents] = useState<Student[]>([]);

  useEffect(() => {
    axios.get('/api/alumnistudent')
      .then(res => setStudents(res.data))
      .catch(err => console.error("Failed to fetch students:", err));
  }, []);

  return (
    <div className="max-w-7xl mx-auto py-12 px-6 min-h-screen bg-gray-50">
      <h1 className="text-4xl font-bold mb-10 text-gray-900">🚀 Discover Talented Students</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {students.map((student) => (
          <div
            key={student._id}
            className="bg-white border border-gray-200 rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
          >
            <div className="flex items-center gap-4 p-6 border-b">
              <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center">
                <UserRound size={24} />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-800">{student.name}</h2>
                <p className="text-sm text-gray-500">{student.degree} in {student.major}</p>
              </div>
            </div>

            <div className="p-6">
              <p className="text-sm text-gray-600 mb-2">
                <span className="font-medium text-gray-700">Top Skills:</span>{' '}
                {student.skills.length > 0 ? student.skills.slice(0, 3).join(', ') : 'N/A'}
              </p>

              <Link
                href={`/alumni/studentDetail/${student._id}`}
                className="inline-block mt-4 text-sm font-medium text-blue-600 hover:text-blue-800 transition"
              >
                View Profile →
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
