'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';

type AlumniType = {
  _id: string;
  name: string;
  job_title: string;
  current_employer: string;
  skills: string[];
  areas_of_expertise: string[];
};

type JobType = {
  _id: string;
  title: string;
  company: string;
  industry: string;
  required_skills: string[];
  description: string;
};

export default function DiscoveryPage() {
  const [alumni, setAlumni] = useState<AlumniType[]>([]);
  const [jobs, setJobs] = useState<JobType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('/api/discovery')
      .then(res => {
        console.log(res.data);
        setAlumni(res.data.alumni);
        setJobs(res.data.jobs);
      })
      .catch(err => console.error('Error fetching discovery data', err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <main className="min-h-screen bg-gray-50 p-6">
      <section className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-black">🔍 Alumni & Job Discovery</h1>

        {loading ? (
          <p className="text-gray-800">Loading...</p>
        ) : (
          <>
            {/* Alumni Section */}
            <h2 className="text-2xl font-semibold mt-4 mb-2 text-black">🎓 Alumni Mentors</h2>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5 mb-10">
              {alumni.map((alum) => (
                <div key={alum._id} className="bg-white p-4 shadow rounded-xl border hover:shadow-md">
                  <div className="flex items-center gap-3 mb-2">
                    <img
                      src={`https://avatars.dicebear.com/api/initials/${encodeURIComponent(alum.name)}.svg`}
                      alt={alum.name}
                      className="w-10 h-10 rounded-full border"
                    />
                    <div>
                      <h3 className="text-lg font-bold text-black">{alum.name}</h3>
                      <p className="text-sm text-gray-800">
                        {alum.job_title} @ {alum.current_employer}
                      </p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-700 mt-1">
                    Expertise: {alum.areas_of_expertise.join(', ')}
                  </p>
                  <button className="text-blue-600 mt-2 hover:underline">Connect</button>
                </div>
              ))}
            </div>

            {/* Job Posts Section */}
            <h2 className="text-2xl font-semibold mt-8 mb-2 text-black">💼 Open Job Posts</h2>
            <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-5">
              {jobs.map((job) => (
                <div key={job._id} className="bg-white p-5 shadow rounded-xl border hover:shadow-md">
                  <div className="flex items-center gap-3 mb-2">
                    <img
                      src={`https://avatars.dicebear.com/api/initials/${encodeURIComponent(job.company)}.svg`}
                      alt={job.company}
                      className="w-10 h-10 rounded-full border"
                    />
                    <div>
                      <h3 className="text-lg font-bold text-black">{job.title}</h3>
                      <p className="text-sm text-gray-800">
                        {job.company} — {job.industry}
                      </p>
                    </div>
                  </div>
                  <p className="text-sm mt-1 text-gray-700">
                    Skills: {job.required_skills?.slice(0, 3).join(', ')}
                  </p>
                  <p className="text-xs text-gray-600 mt-2">
                    {job.description?.slice(0, 100)}...
                  </p>
                  <button className="text-blue-600 mt-2 hover:underline">Apply</button>
                </div>
              ))}
            </div>
          </>
        )}
      </section>
    </main>
  );
}
