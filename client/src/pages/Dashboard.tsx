import { useAuth } from '../contexts/AuthContext';

export default function Dashboard() {
  const { user, signOut } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-6 sm:py-12 px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow overflow-hidden rounded-lg">
          <div className="px-4 py-5 sm:px-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="flex-1">
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Welcome to the application</h1>
              {user && <p className="text-gray-500 mt-1 text-sm sm:text-base">Hello, {user.name}!</p>}
            </div>
            <button 
              onClick={signOut}
              className="w-full sm:w-auto btn-secondary px-4 py-2 text-sm sm:text-base min-h-[40px] sm:min-h-[44px]"
            >
              Logout
            </button>
          </div>
          <div className="border-t border-gray-200 px-4 py-5 sm:p-6">
            <p className="text-gray-700 text-sm sm:text-base">
              You have successfully logged in to your dashboard. Here you can access all your courses, track your progress, and manage your account settings.
            </p>
            
            {/* Dashboard content cards */}
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              <div className="bg-blue-50 rounded-lg p-4 sm:p-6 border border-blue-200">
                <h3 className="font-semibold text-blue-900 text-sm sm:text-base">My Courses</h3>
                <p className="text-blue-700 text-xs sm:text-sm mt-1">View and continue your enrolled courses</p>
              </div>
              <div className="bg-green-50 rounded-lg p-4 sm:p-6 border border-green-200">
                <h3 className="font-semibold text-green-900 text-sm sm:text-base">Progress</h3>
                <p className="text-green-700 text-xs sm:text-sm mt-1">Track your learning progress</p>
              </div>
              <div className="bg-purple-50 rounded-lg p-4 sm:p-6 border border-purple-200 sm:col-span-2 lg:col-span-1">
                <h3 className="font-semibold text-purple-900 text-sm sm:text-base">Certificates</h3>
                <p className="text-purple-700 text-xs sm:text-sm mt-1">View your earned certificates</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
