// src/pages/Analytics.js
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  { subject: 'Math', score: 85, avg: 72 },
  { subject: 'Science', score: 78, avg: 65 },
  { subject: 'English', score: 92, avg: 68 },
  { subject: 'History', score: 65, avg: 70 },
  { subject: 'Geography', score: 90, avg: 75 },
];

export default function Analytics() {
  return (
    <div className="bg-gray-800 rounded-lg shadow p-6 max-w-4xl text-white">
      <h2 className="text-2xl font-bold mb-6">Performance Analytics</h2>
      
      <div className="h-80 mb-8">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#4B5563" />
            <XAxis dataKey="subject" stroke="#9CA3AF" />
            <YAxis stroke="#9CA3AF" />
            <Tooltip 
              contentStyle={{ backgroundColor: '#1F2937', borderColor: '#374151', color: 'white' }} 
            />
            <Legend />
            <Bar dataKey="score" fill="#3b82f6" name="Your Score" />
            <Bar dataKey="avg" fill="#94a3b8" name="Class Average" />
          </BarChart>
        </ResponsiveContainer>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-blue-900 p-4 rounded-lg">
          <h3 className="font-medium mb-2 text-blue-200">Strengths</h3>
          <ul className="list-disc list-inside text-sm text-blue-100">
            <li>Excellent performance in English</li>
            <li>Strong analytical skills in Math</li>
            <li>Good at memorizing geographical facts</li>
          </ul>
        </div>
        
        <div className="bg-yellow-900 p-4 rounded-lg">
          <h3 className="font-medium mb-2 text-yellow-200">Areas for Improvement</h3>
          <ul className="list-disc list-inside text-sm text-yellow-100">
            <li>Need to focus on History concepts</li>
            <li>Science practical applications</li>
            <li>Time management during exams</li>
          </ul>
        </div>
      </div>
    </div>
  );
}