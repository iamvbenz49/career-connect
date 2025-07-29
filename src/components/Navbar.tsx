'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

const studentLinks = [
  { name: 'Home', href: '/student/' },
  { name: 'Discovery', href: '/student/discovery' },
  { name: 'Chat', href: '/student/chat' },
  { name: 'Profile', href: '/student/StudentProfile' },
  { name: 'Notifications', href: '/student/notification' },
];

const alumniLinks = [
  { name: 'Home', href: '/alumni/' },
  { name: 'Discovery', href: '/alumni/discover' },
  { name: 'Chat', href: '/alumni/chat' },
  { name: 'Profile', href: '/alumni/profile' },
  { name: 'Notifications', href: '/alumni/notification' },
];

export default function Navbar() {
  const pathname = usePathname();
  const isStudent = pathname.startsWith('/student');
  const isAlumni = pathname.startsWith('/alumni');
  const navLinks = isStudent ? studentLinks : isAlumni ? alumniLinks : [];

  return (
    <nav className="bg-white shadow-md px-6 py-4 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between">

<motion.div
  animate={{
    y: [0, -6, 0],
  }}
  transition={{
    repeat: Infinity,
    duration: 1.2,
    ease: 'easeInOut',
  }}
>
  <Link href="/" className="text-2xl font-bold text-blue-600">
    🚀 CareerChain
  </Link>
</motion.div>


        {/* Nav Links */}
        <div className="flex gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={cn(
                'text-gray-700 hover:text-blue-600 font-medium transition',
                pathname === link.href && 'text-blue-600 font-semibold underline'
              )}
            >
              {link.name}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
