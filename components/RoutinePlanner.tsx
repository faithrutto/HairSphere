import React, { useState } from 'react';
import { Plus, MoreVertical, Clock } from 'lucide-react';
import { WEEKLY_ROUTINE } from '../constants';
import { DaySchedule } from '../types';

export const RoutinePlanner: React.FC = () => {
  const [schedule, setSchedule] = useState<DaySchedule[]>(WEEKLY_ROUTINE);

  const getCategoryColor = (category: string) => {
    switch(category) {
      case 'wash': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'moisturize': return 'bg-teal-100 text-teal-700 border-teal-200';
      case 'style': return 'bg-purple-100 text-purple-700 border-purple-200';
      case 'care': return 'bg-peach-200 text-peach-800 border-peach-300';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-charcoal">Weekly Schedule</h2>
          <p className="text-softbrown mt-1">Drag and drop to reorganize your hair care routine.</p>
        </div>
        <button className="flex items-center gap-2 bg-peach-300 text-white px-5 py-2.5 rounded-xl font-medium hover:bg-peach-400 transition-colors shadow-sm">
          <Plus size={20} /> Add Routine
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        {schedule.map((dayPlan) => (
          <div key={dayPlan.day} className="bg-white rounded-2xl border border-peach-100 shadow-sm flex flex-col h-full min-h-[200px]">
            <div className="p-4 border-b border-peach-50 flex justify-between items-center bg-peach-50/30 rounded-t-2xl">
              <h3 className="font-bold text-charcoal">{dayPlan.day}</h3>
              <span className="text-xs font-medium text-peach-600 bg-peach-100 px-2 py-1 rounded-md">
                {dayPlan.tasks.length} tasks
              </span>
            </div>
            
            <div className="p-3 space-y-3 flex-1">
              {dayPlan.tasks.length > 0 ? (
                dayPlan.tasks.map((task) => (
                  <div 
                    key={task.id} 
                    className={`p-3 rounded-xl border ${getCategoryColor(task.category)} relative group transition-all hover:shadow-md cursor-grab active:cursor-grabbing`}
                  >
                    <div className="flex justify-between items-start mb-1">
                      <span className="text-[10px] font-bold uppercase tracking-wide opacity-80">{task.category}</span>
                      <button className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-black/5 rounded">
                        <MoreVertical size={14} />
                      </button>
                    </div>
                    <h4 className="font-semibold text-sm leading-tight mb-1">{task.title}</h4>
                    <div className="flex items-center gap-1 text-xs opacity-80 mt-2">
                        <Clock size={12} /> {task.timeEstimate}
                    </div>
                  </div>
                ))
              ) : (
                <div className="h-full flex items-center justify-center border-2 border-dashed border-peach-100 rounded-xl p-4 text-center">
                  <span className="text-sm text-gray-400">Rest Day</span>
                </div>
              )}
            </div>
            {/* Drop target placeholder would go here in a real DnD implementation */}
          </div>
        ))}
      </div>
    </div>
  );
};