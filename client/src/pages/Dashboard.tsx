import { useAuth } from '../contexts/AuthContext';

export default function Dashboard() {
  const { user, signOut } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow overflow-hidden rounded-lg">
          <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Welcome to the application</h1>
              {user && <p className="text-gray-500 mt-1">Hello, {user.name}!</p>}
            </div>
            <button 
              onClick={signOut}
              className="btn-secondary"
            >
              Logout
            </button>
          </div>
          <div className="border-t border-gray-200 px-4 py-5 sm:p-6">
            <p className="text-gray-700">
              You have successfully logged into the protected area of the application.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
