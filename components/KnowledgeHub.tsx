import React, { useState } from 'react';
import { Search, Filter, BookOpen } from 'lucide-react';
import { ARTICLES } from '../constants';

export const KnowledgeHub: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const filteredArticles = ARTICLES.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          article.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || article.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = ['all', 'growth', 'maintenance', 'styling', 'science'];

  return (
    <div className="space-y-6">
      <div className="text-center max-w-2xl mx-auto mb-10">
        <h2 className="text-3xl font-bold text-charcoal mb-2">Hair Knowledge Hub</h2>
        <p className="text-softbrown">Curated articles to help you master your hair journey.</p>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input 
            type="text" 
            placeholder="Search for techniques, terms, or tips..." 
            className="w-full pl-12 pr-4 py-3 rounded-xl border border-peach-200 focus:outline-none focus:ring-2 focus:ring-peach-300 focus:border-transparent bg-white"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 no-scrollbar">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl capitalize whitespace-nowrap text-sm font-medium transition-colors ${
                selectedCategory === cat 
                  ? 'bg-charcoal text-white' 
                  : 'bg-white border border-peach-200 text-softbrown hover:bg-peach-50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredArticles.map((article) => (
          <article key={article.id} className="bg-white rounded-2xl overflow-hidden border border-peach-100 shadow-sm hover:shadow-md transition-shadow group">
            <div className="h-48 overflow-hidden relative">
              <img 
                src={article.imageUrl} 
                alt={article.title} 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute top-4 left-4">
                 <span className="bg-white/90 backdrop-blur-sm text-charcoal text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
                   {article.category}
                 </span>
              </div>
            </div>
            <div className="p-6">
              <div className="flex items-center text-xs text-softbrown mb-3">
                <Clock size={14} className="mr-1" /> {article.readTime} read
              </div>
              <h3 className="text-xl font-bold text-charcoal mb-2 group-hover:text-peach-600 transition-colors">{article.title}</h3>
              <p className="text-softbrown text-sm line-clamp-2">{article.excerpt}</p>
              <button className="mt-4 text-peach-600 text-sm font-bold flex items-center gap-1 group-hover:gap-2 transition-all">
                Read Article <ArrowRight size={16} />
              </button>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

// Simple helper icon component for this file
const Clock = ({ size, className }: { size: number, className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
);

const ArrowRight = ({ size, className }: { size: number, className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
);