import React, { useMemo } from 'react';
import { List, Agent, AgentName } from '../types';
import { getThoughts } from '../services/storageService';
import {
    HomeIcon, SettingsIcon, FeedbackIcon, PlusIcon, SyncIcon, AllIcon, SparklesIcon, BookOpenIcon
} from './Icons';

interface SidebarProps {
    lists: List[];
    agents: Agent[];
    activeListId: string;
    setActiveListId: (id: string) => void;
    thoughtCount: number;
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
    onActivateLens: (lens: AgentName) => void;
    onStartReflection: () => void;
    searchTerm: string;
    setSearchTerm: (term: string) => void;
    onSearchWithAI: () => void;
    onClearSearch: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ 
    lists, agents, activeListId, setActiveListId, thoughtCount, isOpen, setIsOpen,
    onActivateLens, onStartReflection, searchTerm, setSearchTerm, onSearchWithAI, onClearSearch
}) => {
    const listCounts = useMemo(() => {
        const allThoughts = getThoughts();
        const counts = new Map<string, number>();
        for (const thought of allThoughts) {
            counts.set(thought.listId, (counts.get(thought.listId) || 0) + 1);
        }
        return counts;
    }, [thoughtCount]);

    const NavItem: React.FC<{ icon: React.ReactNode; label: string; onClick?: () => void }> = ({ icon, label, onClick }) => (
        <button onClick={onClick} className="w-full flex items-center space-x-3 px-3 py-2 text-[#5A524A] hover:bg-[#EDE6DB] rounded-md transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500">
            {icon}
            <span className="font-medium">{label}</span>
        </button>
    );

    const ListItem: React.FC<{ list: List }> = ({ list }) => {
        const count = listCounts.get(list.id) || 0;
        const isActive = activeListId === list.id;
        return (
            <button
                onClick={() => setActiveListId(list.id)}
                className={`w-full flex items-center justify-between px-3 py-2 text-left rounded-md transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 ${isActive ? 'bg-[#EDE6DB]' : 'hover:bg-[#EDE6DB]'}`}
            >
                <div className="flex items-center space-x-3">
                    <list.icon className="w-5 h-5" />
                    <span className="font-medium text-[#332E27]">{list.name}</span>
                </div>
                <span className="text-sm text-[#8D8478]">{count}</span>
            </button>
        );
    };

    return (
        <>
            <div className={`fixed inset-0 bg-black/50 z-30 md:hidden transition-opacity ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} onClick={() => setIsOpen(false)}></div>
            <aside className={`flex-shrink-0 w-64 bg-[#F7F2EB]/95 border-r border-[#EDE6DB] flex flex-col p-3 transition-transform transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:relative md:translate-x-0 fixed h-full md:h-auto z-40`}>
                <div className="flex-1 space-y-4 overflow-y-auto">
                    <div className="px-3 text-sm text-[#8D8478]">{thoughtCount} entries</div>
                    
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-4 pr-10 py-2 bg-white border border-[#EDE6DB] rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none text-sm"
                        />
                        <button onClick={onSearchWithAI} className="absolute inset-y-0 right-0 flex items-center pr-3 text-[#8D8478] hover:text-indigo-600" title="Search with AI">
                            <SparklesIcon className="w-5 h-5" />
                        </button>
                    </div>


                    <nav className="space-y-1">
                        <NavItem icon={<HomeIcon className="w-5 h-5" />} label="Home" />
                        <NavItem icon={<BookOpenIcon className="w-5 h-5" />} label="Reflect" onClick={onStartReflection} />
                        <NavItem icon={<SettingsIcon className="w-5 h-5" />} label="Settings" />
                    </nav>

                    <div className="space-y-2">
                        <div className="px-3 text-xs font-semibold text-[#8D8478] uppercase tracking-wider">Lenses</div>
                        <div className="flex flex-wrap gap-2 px-3">
                            {agents.map(agent => (
                                <button key={agent.id} onClick={() => onActivateLens(agent.id)} className="flex items-center space-x-2 px-3 py-1 rounded-full bg-white border border-[#EDE6DB] hover:bg-[#EDE6DB] active:bg-[#D9D0C4] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500">
                                    <span className={`w-3 h-3 rounded-full ${agent.color}`}></span>
                                    <span className="text-sm font-medium">{agent.id}</span>
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="space-y-1">
                        <div className="px-3 text-xs font-semibold text-[#8D8478] uppercase tracking-wider">Lists</div>
                        <button
                            onClick={() => setActiveListId('all')}
                            className={`w-full flex items-center justify-between px-3 py-2 text-left rounded-md transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 ${activeListId === 'all' ? 'bg-[#EDE6DB]' : 'hover:bg-[#EDE6DB]'}`}
                        >
                             <div className="flex items-center space-x-3">
                                <AllIcon />
                                <span className="font-medium text-[#332E27]">All</span>
                            </div>
                            <span className="text-sm text-[#8D8478]">{thoughtCount}</span>
                        </button>
                        {lists.map(list => (
                            <ListItem key={list.id} list={list} />
                        ))}
                         <button className="flex items-center space-x-2 px-3 py-2 text-indigo-600 hover:bg-indigo-100/50 rounded-md w-full text-left transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500">
                            <PlusIcon className="w-4 h-4" />
                            <span className="text-sm font-medium">Create a list</span>
                        </button>
                    </div>
                </div>

                <div className="mt-auto pt-4 border-t border-[#EDE6DB]">
                    <div className="flex items-center space-x-2 px-3 text-sm text-[#8D8478]">
                        <SyncIcon className="w-4 h-4" />
                        <span>Synced just now</span>
                    </div>
                </div>
            </aside>
        </>
    );
};
