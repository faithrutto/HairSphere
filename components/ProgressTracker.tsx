import React from 'react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar
} from 'recharts';
import { Camera, Ruler, Droplets } from 'lucide-react';
import { PROGRESS_DATA } from '../constants';

export const ProgressTracker: React.FC = () => {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-charcoal">Progress Tracker</h2>
        <p className="text-softbrown mt-1">Visualize your hair growth and health metrics over time.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Growth Chart */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-peach-100">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-charcoal flex items-center gap-2">
              <Ruler className="text-peach-400" /> Growth (Inches)
            </h3>
            <span className="text-sm text-green-600 bg-green-50 px-3 py-1 rounded-full font-medium">
              +1.8" Total
            </span>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={PROGRESS_DATA} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="date" stroke="#999" fontSize={12} tickFormatter={(str) => new Date(str).toLocaleDateString(undefined, {month:'short'})} />
                <YAxis domain={['dataMin - 0.5', 'dataMax + 0.5']} stroke="#999" fontSize={12} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#fff', borderRadius: '12px', border: '1px solid #FFE8E0', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                  itemStyle={{ color: '#E88B6F' }}
                />
                <Line 
                  type="monotone" 
                  dataKey="length" 
                  stroke="#FAC8B4" 
                  strokeWidth={4}
                  dot={{ r: 6, fill: '#E88B6F', strokeWidth: 2, stroke: '#fff' }}
                  activeDot={{ r: 8 }} 
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Hydration Score Chart */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-peach-100">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-charcoal flex items-center gap-2">
              <Droplets className="text-blue-400" /> Hydration Score
            </h3>
            <span className="text-sm text-blue-600 bg-blue-50 px-3 py-1 rounded-full font-medium">
              Avg: 6.5/10
            </span>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={PROGRESS_DATA} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis dataKey="date" stroke="#999" fontSize={12} tickFormatter={(str) => new Date(str).toLocaleDateString(undefined, {month:'short'})} />
                <YAxis domain={[0, 10]} stroke="#999" fontSize={12} />
                <Tooltip 
                   contentStyle={{ backgroundColor: '#fff', borderRadius: '12px', border: '1px solid #e0f2fe', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                   cursor={{ fill: '#f0f9ff' }}
                />
                <Bar dataKey="hydrationScore" fill="#BAE6FD" radius={[6, 6, 0, 0]} barSize={30} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Photo Log Placeholder */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-peach-100">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-charcoal">Visual Journey</h3>
          <button className="flex items-center gap-2 text-peach-600 border border-peach-200 hover:bg-peach-50 px-4 py-2 rounded-xl transition-colors font-medium">
            <Camera size={18} /> Add Photo
          </button>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {PROGRESS_DATA.slice(0, 4).map((log, idx) => (
            <div key={log.id} className="group relative aspect-[3/4] bg-gray-100 rounded-xl overflow-hidden cursor-pointer">
              <img 
                src={`https://picsum.photos/300/400?random=${idx + 10}`} 
                alt={`Progress ${log.date}`} 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
              />
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/60 to-transparent p-3">
                <p className="text-white text-xs font-bold">{log.date}</p>
                <p className="text-white/80 text-[10px] truncate">{log.notes}</p>
              </div>
            </div>
          ))}
          <div className="aspect-[3/4] border-2 border-dashed border-peach-200 rounded-xl flex flex-col items-center justify-center text-peach-400 hover:bg-peach-50 hover:border-peach-300 transition-colors cursor-pointer">
            <Camera size={32} className="mb-2" />
            <span className="text-sm font-medium">Upload</span>
          </div>
        </div>
      </div>
    </div>
  );
};