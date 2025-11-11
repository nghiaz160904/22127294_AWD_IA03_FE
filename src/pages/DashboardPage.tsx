import { useQuery } from '@tanstack/react-query';
import { fetchProfile } from '../api/services/userService';
import { useAuth } from '../hooks/useAuth';

export default function DashboardPage() {
  const { data, isLoading } = useQuery({ queryKey: ['user'], queryFn: fetchProfile });
  const { logoutMutation } = useAuth();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-lg text-gray-600">Loading...</p>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-lg text-gray-600">No user data available</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white shadow rounded-lg p-8">
          <div className="border-b border-gray-200 pb-6 mb-6">
            <h2 className="text-3xl font-bold text-gray-900">
              Welcome {data?.firstName} {data?.lastName}
            </h2>
          </div>

          <div className="space-y-4">
            <div className="flex items-center">
              <span className="text-sm font-medium text-gray-500 w-24">Email:</span>
              <span className="text-base text-gray-900">{data?.email}</span>
            </div>

            <div className="flex items-center">
              <span className="text-sm font-medium text-gray-500 w-24">Role:</span>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                {data?.role}
              </span>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-200">
            <button
              onClick={() => logoutMutation.mutate(data?.email)}
              className="w-full sm:w-auto px-6 py-2 bg-red-600 hover:bg-red-700 text-white font-medium rounded-md shadow-sm transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
