import React from 'react';
import { CheckCircle2, Circle, Clock, Droplets, Calendar, ArrowRight } from 'lucide-react';
import { WEEKLY_ROUTINE } from '../constants';

interface DashboardProps {
  onNavigate: (tab: string) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ onNavigate }) => {
  const today = 'Monday'; // Mocking today as Monday
  const todaysRoutine = WEEKLY_ROUTINE.find(d => d.day === today);
  const tasks = todaysRoutine?.tasks || [];
  const completedCount = tasks.filter(t => t.completed).length;
  const progressPercentage = tasks.length > 0 ? (completedCount / tasks.length) * 100 : 0;

  return (
    <div className="space-y-6">
      <header className="mb-8">
        <h2 className="text-3xl font-bold text-charcoal">Good Morning, Jane!</h2>
        <p className="text-softbrown mt-1">Ready to nourish your hair today?</p>
      </header>

      {/* Hero Stats / Today's Focus */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gradient-to-br from-peach-300 to-peach-400 rounded-2xl p-6 text-white shadow-lg shadow-peach-200/50">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-lg">Today's Goal</h3>
            <Droplets className="opacity-80" />
          </div>
          <p className="text-3xl font-bold mb-1">Hydrate</p>
          <p className="text-sm opacity-90">Focus on ends sealing.</p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-peach-100 flex flex-col justify-between">
           <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-charcoal">Routine Progress</h3>
            <Clock className="text-peach-400" />
          </div>
          <div>
            <div className="flex justify-between text-sm mb-2 text-softbrown">
              <span>{completedCount}/{tasks.length} tasks</span>
              <span>{Math.round(progressPercentage)}%</span>
            </div>
            <div className="h-2 w-full bg-peach-100 rounded-full overflow-hidden">
              <div 
                className="h-full bg-peach-400 rounded-full transition-all duration-500"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-peach-100 cursor-pointer hover:border-peach-300 transition-colors" onClick={() => onNavigate('routine')}>
           <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-charcoal">Next Wash Day</h3>
            <Calendar className="text-peach-400" />
          </div>
          <p className="text-3xl font-bold text-charcoal mb-1">Saturday</p>
          <p className="text-sm text-softbrown">4 days remaining</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
        {/* Today's Routine List */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-sm border border-peach-100">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-charcoal">Today's Routine</h3>
            <button onClick={() => onNavigate('routine')} className="text-sm text-peach-600 font-semibold hover:underline">View Full Week</button>
          </div>
          
          <div className="space-y-4">
            {tasks.length > 0 ? (
              tasks.map((task) => (
                <div key={task.id} className="flex items-start p-4 rounded-xl bg-peach-50/50 border border-peach-100 hover:bg-peach-50 transition-colors">
                  <button className={`mt-1 mr-4 ${task.completed ? 'text-peach-500' : 'text-gray-300 hover:text-peach-400'}`}>
                    {task.completed ? <CheckCircle2 size={24} /> : <Circle size={24} />}
                  </button>
                  <div className="flex-1">
                    <h4 className={`font-semibold text-lg ${task.completed ? 'text-gray-400 line-through' : 'text-charcoal'}`}>{task.title}</h4>
                    <p className="text-softbrown text-sm mt-1">{task.description}</p>
                    <span className="inline-block mt-2 text-xs font-medium px-2 py-1 bg-white border border-peach-200 rounded-md text-peach-700">
                      {task.timeEstimate}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-softbrown text-center py-8">No tasks scheduled for today. Enjoy your break!</p>
            )}
          </div>
        </div>

        {/* Quick Tips / Knowledge Snippet */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-peach-100 flex flex-col">
          <h3 className="text-xl font-bold text-charcoal mb-4">Daily Tip</h3>
          <div className="flex-1 rounded-xl overflow-hidden relative mb-4 group cursor-pointer" onClick={() => onNavigate('knowledge')}>
            <img 
              src="https://picsum.photos/400/300?grayscale" 
              alt="Hair tip" 
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-4">
              <span className="text-peach-300 text-xs font-bold uppercase tracking-wider mb-1">Maintenance</span>
              <p className="text-white font-medium">Sleep with a satin bonnet to reduce friction and breakage.</p>
            </div>
          </div>
          <button 
            onClick={() => onNavigate('ai-advisor')}
            className="w-full py-3 rounded-xl bg-charcoal text-white font-medium hover:bg-black transition-colors flex items-center justify-center gap-2"
          >
            Ask the Expert <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};