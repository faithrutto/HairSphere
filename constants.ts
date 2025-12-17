import { Article, DaySchedule, ProgressLog } from './types';

export const WEEKLY_ROUTINE: DaySchedule[] = [
  {
    day: 'Monday',
    tasks: [
      { id: '1', title: 'Daily Hydration', description: 'Apply leave-in conditioner and seal with oil.', category: 'moisturize', completed: false, timeEstimate: '10 min' },
      { id: '2', title: 'Scalp Massage', description: 'Stimulate blood flow for 5 minutes.', category: 'care', completed: true, timeEstimate: '5 min' },
    ]
  },
  {
    day: 'Tuesday',
    tasks: [
      { id: '3', title: 'Refresh Curls', description: 'Light mist and scrunch.', category: 'style', completed: false, timeEstimate: '5 min' },
    ]
  },
  {
    day: 'Wednesday',
    tasks: [
      { id: '4', title: 'Mid-week Moisture', description: 'Re-apply hydration method.', category: 'moisturize', completed: false, timeEstimate: '10 min' },
    ]
  },
  {
    day: 'Thursday',
    tasks: []
  },
  {
    day: 'Friday',
    tasks: [
      { id: '5', title: 'Protective Styling', description: 'Put hair in twists for the weekend.', category: 'style', completed: false, timeEstimate: '30 min' },
    ]
  },
  {
    day: 'Saturday',
    tasks: [
      { id: '6', title: 'Wash Day', description: 'Shampoo, Condition, Deep Condition.', category: 'wash', completed: false, timeEstimate: '90 min' },
    ]
  },
  {
    day: 'Sunday',
    tasks: [
      { id: '7', title: 'Hot Oil Treatment', description: 'Pre-poo prep for the week.', category: 'care', completed: false, timeEstimate: '20 min' },
    ]
  },
];

export const ARTICLES: Article[] = [
  {
    id: '1',
    title: 'Understanding Porosity',
    excerpt: 'Why water rolls off your hair and how to fix it with heat.',
    category: 'science',
    readTime: '5 min',
    imageUrl: 'https://picsum.photos/400/250?random=1'
  },
  {
    id: '2',
    title: 'The L.C.O Method',
    excerpt: 'Liquid, Cream, Oil: The holy grail for moisture retention.',
    category: 'maintenance',
    readTime: '3 min',
    imageUrl: 'https://picsum.photos/400/250?random=2'
  },
  {
    id: '3',
    title: 'Growth vs. Retention',
    excerpt: 'Your hair is growing, but is it breaking? Learn the difference.',
    category: 'growth',
    readTime: '7 min',
    imageUrl: 'https://picsum.photos/400/250?random=3'
  },
  {
    id: '4',
    title: 'Protective Styles 101',
    excerpt: 'Low manipulation styles that look great and protect your ends.',
    category: 'styling',
    readTime: '6 min',
    imageUrl: 'https://picsum.photos/400/250?random=4'
  }
];

export const PROGRESS_DATA: ProgressLog[] = [
  { id: '1', date: '2023-10-01', length: 12.0, hydrationScore: 4, notes: 'Starting journey' },
  { id: '2', date: '2023-11-01', length: 12.2, hydrationScore: 5, notes: 'Less breakage noted' },
  { id: '3', date: '2023-12-01', length: 12.5, hydrationScore: 7, notes: 'Deep conditioning helping' },
  { id: '4', date: '2024-01-01', length: 13.0, hydrationScore: 6, notes: 'Winter dryness' },
  { id: '5', date: '2024-02-01', length: 13.4, hydrationScore: 8, notes: 'Found right oil' },
  { id: '6', date: '2024-03-01', length: 13.8, hydrationScore: 9, notes: 'Consistent routine' },
];