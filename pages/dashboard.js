import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        router.push('/login');
        return;
      }

      try {
        const { data } = await axios.get('/api/user', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(data);
      } catch (err) {
        console.error('Error fetching user data:', err);
        router.push('/login');
      }
    };

    fetchUserData();
  }, [router]);

  if (!user) return <div>Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-4">Welcome, {user.name}</h1>
      <p className="mb-6">Role: {user.role}</p>

      <div className="flex flex-col gap-4">
        <button
          onClick={() => router.push('/blood/request')}
          className="px-6 py-3 bg-blue-500 text-white rounded"
        >
          Request Blood
        </button>
        <button
          onClick={() => router.push('/blood/donate')}
          className="px-6 py-3 bg-green-500 text-white rounded"
        >
          Donate Blood
        </button>
        <button
          onClick={() => router.push('/chat')}
          className="px-6 py-3 bg-purple-500 text-white rounded"
        >
          Chat with Donors
        </button>
      </div>
    </div>
  );
}
