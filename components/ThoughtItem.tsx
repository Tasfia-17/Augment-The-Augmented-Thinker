import React from 'react';
import { Thought } from '../types';
import { AGENTS } from '../constants';

interface ThoughtItemProps {
    thought: Thought;
    isLast: boolean;
    onSelect: () => void;
}

export const ThoughtItem: React.FC<ThoughtItemProps> = ({ thought, isLast, onSelect }) => {
    
    const agentColor = AGENTS.find(a => a.id === thought.agent)?.color || 'bg-gray-400';

    const formatTime = (timestamp: number) => {
        const date = new Date(timestamp);
        return date.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
    };
    
    return (
        <li id={thought.id} onClick={onSelect} className="cursor-pointer group">
            <div className="relative pb-8">
                {!isLast && <span className="absolute left-4 top-5 -ml-px h-full w-0.5 bg-[#EDE6DB]" aria-hidden="true" />}
                
                <div className="relative flex items-start space-x-3">
                    <div className="relative px-1">
                        <div className="h-8 w-8 bg-[#F7F2EB] rounded-full ring-4 ring-[#FFFBF5] flex items-center justify-center">
                            {thought.author === 'user' ? (
                                <div className="h-2.5 w-2.5 rounded-full" style={{backgroundColor: thought.color}}></div>
                            ) : (
                                <div className={`w-5 h-5 rounded-full flex-shrink-0 ${agentColor}`}></div>
                            )}
                        </div>
                    </div>
                    
                    <div className="min-w-0 flex-1 pt-1.5">
                        {thought.author === 'user' ? (
                            <div className="p-1 rounded-md group-hover:bg-[#F7F2EB]/50">
                                {thought.text && <p className="text-base text-[#332E27]">{thought.text}</p>}
                                {thought.imageUrl && (
                                    <div className="mt-2">
                                        <img src={thought.imageUrl} alt="User upload" className="max-w-xs rounded-lg border border-[#EDE6DB]" />
                                    </div>
                                )}
                                <p className="mt-1 text-xs text-[#8D8478]">{formatTime(thought.timestamp)}</p>
                            </div>
                        ) : (
                            <div className="bg-[#F7F2EB] rounded-xl p-3">
                                <p className="text-base text-[#332E27] whitespace-pre-wrap">{thought.text}</p>
                                <div className="mt-2 flex items-center space-x-2 text-xs text-[#8D8478]">
                                    <span>{thought.agent}</span>
                                    <span>&middot;</span>
                                    <span>{formatTime(thought.timestamp)}</span>
                                 </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </li>
    );
};
