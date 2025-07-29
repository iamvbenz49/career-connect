'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';

interface Notification {
  _id: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  is_read: boolean;
  created_at: string;
}

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const userId = 'sample-user-id'; // Replace with actual user id

  useEffect(() => {
    axios.get(`/api/notifications`)
      .then(res => setNotifications(res.data))
      .catch(err => console.error("Notification fetch failed:", err));
  }, []);

  return (
    <div className="max-w-3xl mx-auto py-10 px-6">
      <h1 className="text-3xl font-bold mb-6">🔔 Notifications</h1>
      <ul className="space-y-4">
        {notifications.map((n) => (
          <li key={n._id} className={`p-4 rounded-xl shadow-md ${n.is_read ? 'bg-gray-100' : 'bg-white border-l-4'} border-${n.type === 'error' ? 'red' : n.type === 'warning' ? 'yellow' : n.type === 'success' ? 'green' : 'blue'}-500`}>
            <p className="text-sm text-gray-800">{n.message}</p>
            <p className="text-xs text-gray-400 mt-1">{new Date(n.created_at).toLocaleString()}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
