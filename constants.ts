
import { List, Agent } from './types';
import { 
    VisualIcon, ReadingIcon, DistillIcon, WritingIcon, GoalsIcon, WineIcon,
    SimIcon, BadmintonIcon, BiologyIcon, TeapotIcon, FitnessIcon 
} from './components/Icons';

export const AGENTS: Agent[] = [
    { id: 'Chronos', color: 'bg-rose-400' },
    { id: 'Clarity', color: 'bg-sky-400' },
    { id: 'Forge', color: 'bg-amber-400' },
    { id: 'Lens', color: 'bg-violet-400' },
];

export const LISTS: List[] = [
    { id: 'visual', name: 'Visual', icon: VisualIcon, color: '#f87171' },
    { id: 'reading', name: 'Reading', icon: ReadingIcon, color: '#60a5fa' },
    { id: 'distill', name: 'Distill stuff', icon: DistillIcon, color: '#a78bfa' },
    { id: 'writing', name: 'Writing', icon: WritingIcon, color: '#fb923c' },
    { id: 'goals', name: 'Goals', icon: GoalsIcon, color: '#facc15' },
    { id: 'wine', name: 'Wine', icon: WineIcon, color: '#a3e635' },
    { id: 'sim', name: 'Sim', icon: SimIcon, color: '#4ade80' },
    { id: 'badminton', name: 'Badminton', icon: BadmintonIcon, color: '#34d399' },
    { id: 'biology', name: 'Biology', icon: BiologyIcon, color: '#2dd4bf' },
    { id: 'teapot', name: 'Teapot', icon: TeapotIcon, color: '#67e8f9' },
    { id: 'fitness', name: 'Fitness', icon: FitnessIcon, color: '#818cf8' },
];