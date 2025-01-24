import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

export default function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('patient');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/auth/signup', { name, email, password, role });
      router.push('/login');
    } catch (err) {
      console.error('Signup failed:', err.response?.data?.error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form className="bg-white p-8 rounded shadow-md w-full max-w-md" onSubmit={handleSubmit}>
        <h2 className="text-2xl font-bold mb-6">Signup</h2>
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
          <input
            id="name"
            type="text"
            className="w-full px-3 py-2 border rounded"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
          <input
            id="email"
            type="email"
            className="w-full px-3 py-2 border rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
          <input
            id="password"
            type="password"
            className="w-full px-3 py-2 border rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="mb-6">
          <label htmlFor="role" className="block text-sm font-medium text-gray-700">Role</label>
          <select
            id="role"
            className="w-full px-3 py-2 border rounded"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="patient">Patient</option>
            <option value="donor">Donor</option>
          </select>
        </div>
        <button type="submit" className="w-full bg-green-500 text-white py-2 px-4 rounded">
          Signup
        </button>
      </form>
    </div>
  );
}
