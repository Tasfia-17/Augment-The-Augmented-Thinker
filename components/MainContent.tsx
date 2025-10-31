import React from 'react';
import { Thought, List } from '../types';
import { ThoughtInput } from './ThoughtInput';
import { ThoughtItem } from './ThoughtItem';
import { AllIcon } from './Icons';

interface MainContentProps {
    thoughts: Thought[];
    onSaveThought: (text: string, image: string | null) => void;
    isAiThinking: boolean;
    activeListId: string;
    lists: List[];
    setSelectedThought: (thought: Thought | null) => void;
    onGenerateImage: (prompt: string) => Promise<string | null>;
}

export const MainContent: React.FC<MainContentProps> = ({ thoughts, onSaveThought, isAiThinking, activeListId, lists, setSelectedThought, onGenerateImage }) => {
    
    const activeList = activeListId === 'all' ? null : lists.find(l => l.id === activeListId);
    const activeListName = activeList?.name || 'All';
    const ActiveListIcon = activeList?.icon || AllIcon;
    const thoughtCount = thoughts.length;
    
    return (
        <main className="flex-1 bg-[#FFFBF5] overflow-y-auto">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                 <div className="sticky top-0 bg-[#FFFBF5]/80 backdrop-blur-md z-10 py-3 mb-6 border-b border-[#EDE6DB]">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                             <ActiveListIcon className="w-6 h-6" />
                            <h1 className="text-xl font-bold text-[#332E27]">{activeListName}</h1>
                            <span className="px-2.5 py-0.5 text-sm font-semibold text-[#5A524A] bg-[#F7F2EB] rounded-full">{thoughtCount}</span>
                        </div>
                    </div>
                </div>

                <ThoughtInput onSave={onSaveThought} onGenerateImage={onGenerateImage} />

                <div className="mt-8 flow-root">
                    <ul className="-mb-8">
                        {thoughts.map((thought, thoughtIdx) => (
                            <ThoughtItem 
                                key={thought.id}
                                thought={thought}
                                isLast={thoughtIdx === thoughts.length - 1}
                                onSelect={() => setSelectedThought(thought)}
                            />
                        ))}
                        {isAiThinking && (
                           <li>
                                <div className="relative pb-8">
                                    <div className="relative flex items-start space-x-3">
                                        <div className="relative px-1">
                                            <div className="h-8 w-8 bg-[#F7F2EB] rounded-full ring-4 ring-[#FFFBF5] flex items-center justify-center">
                                                 <div className="h-2 w-2 bg-indigo-500 rounded-full animate-pulse"></div>
                                            </div>
                                        </div>
                                        <div className="min-w-0 flex-1 py-1.5">
                                            <div className="bg-[#F7F2EB] rounded-xl p-3">
                                                <p className="text-sm text-[#8D8478] animate-pulse">Thinking...</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        )}
                    </ul>
                </div>
            </div>
        </main>
    );
};