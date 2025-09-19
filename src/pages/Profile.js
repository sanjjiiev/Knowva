// src/pages/Profile.js
export default function Profile({ user }) {
  return (
    <div className="bg-gray-800 rounded-lg shadow p-6 max-w-2xl text-white">
      <h2 className="text-2xl font-bold mb-6">Profile</h2>
      
      <div className="flex items-center mb-6">
        <div className="w-16 h-16 rounded-full bg-blue-600 flex items-center justify-center text-white text-2xl font-bold mr-4">
          {user[0].toUpperCase()}
        </div>
        <div>
          <div className="text-xl font-semibold">{user}</div>
          <div className="text-sm text-gray-400">Student</div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 bg-gray-700 rounded-lg">
          <h3 className="font-medium mb-2">Personal Information</h3>
          <div className="text-sm text-gray-300">
            <p>Email: {user.toLowerCase()}@example.com</p>
            <p>Joined: January 2023</p>
          </div>
        </div>
        
        <div className="p-4 bg-gray-700 rounded-lg">
          <h3 className="font-medium mb-2">Course Progress</h3>
          <div className="text-sm text-gray-300">
            <p>Completed: 12 courses</p>
            <p>In Progress: 3 courses</p>
          </div>
        </div>
        
        <div className="p-4 bg-gray-700 rounded-lg">
          <h3 className="font-medium mb-2">Achievements</h3>
          <div className="text-sm text-gray-300">
            <p>🏆 Top Learner (March 2023)</p>
            <p>⭐ Consistency Master</p>
          </div>
        </div>
        
        <div className="p-4 bg-gray-700 rounded-lg">
          <h3 className="font-medium mb-2">Settings</h3>
          <div className="text-sm text-gray-300">
            <p>Notifications: Enabled</p>
            <p>Language: English</p>
          </div>
        </div>
      </div>
    </div>
  );
}