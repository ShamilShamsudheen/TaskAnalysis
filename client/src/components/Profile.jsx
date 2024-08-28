import React from 'react';
import { useSelector } from 'react-redux';

const UserProfile = () => {
  // Get user data from Redux store
  const user = useSelector((state) => state.auth.user);

  // Check if user data exists
  if (!user) {
    return <div>No user data found</div>;
  }

  return (
    <div className="max-w-sm mx-auto mt-6 bg-white shadow-md rounded-lg overflow-hidden">
      <div className="flex items-center justify-center p-4 bg-blue-500">
        <img
          className="w-24 h-24 rounded-full"
          src=''
          alt={`${user.firstName} ${user.lastName}`}
        />
      </div>
      <div className="p-4">
        <h2 className="text-xl font-semibold text-gray-900">{`${user.firstName} ${user.lastName}`}</h2>
        <p className="text-gray-700">{user.email}</p>
      </div>
    </div>
  );
};

export default UserProfile;
