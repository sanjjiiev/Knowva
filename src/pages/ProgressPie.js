// src/pages/ProgressPie.js
import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { name: "Math", value: 70, color: "#34d399" },
  { name: "Science", value: 15, color: "#60a5fa" },
  { name: "English", value: 15, color: "#fbbf24" }
];

export default function ProgressPie() {
  return (
    <div className="bg-gray-800 rounded-lg shadow p-6 max-w-2xl text-white">
      <h2 className="text-2xl font-bold mb-6">Progress Overview</h2>
      
      <div className="flex flex-col items-center">
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              outerRadius={100}
              innerRadius={60}
              paddingAngle={5}
              dataKey="value"
              label
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
        
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
          {data.map((item, index) => (
            <div key={index} className="bg-gray-700 p-4 rounded-lg">
              <div className="flex items-center">
                <div className="w-4 h-4 rounded-full mr-2" style={{ backgroundColor: item.color }}></div>
                <span className="font-medium">{item.name}</span>
              </div>
              <div className="text-2xl font-bold mt-2">{item.value}%</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}