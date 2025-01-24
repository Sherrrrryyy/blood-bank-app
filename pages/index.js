import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-6">Welcome to Blood Bank Application</h1>
      <p className="text-lg mb-4">Connecting patients with donors for a better tomorrow.</p>
      <div className="flex gap-4">
        <Link href="/login">
          <a className="px-6 py-2 bg-blue-500 text-white rounded">Login</a>
        </Link>
        <Link href="/signup">
          <a className="px-6 py-2 bg-green-500 text-white rounded">Signup</a>
        </Link>
      </div>
    </div>
  );
}
