import React from 'react';
import { Thought } from '../types';

interface ReflectionViewProps {
    data: { thoughts: Thought[], prompt: string; isLoading: boolean };
    onClose: () => void;
}

const ReflectionThought: React.FC<{thought: Thought}> = ({ thought }) => (
    <div className="bg-[#F7F2EB]/80 p-4 rounded-lg">
        <p className="text-base text-[#332E27]">{thought.text || 'Image thought'}</p>
        <p className="text-xs text-[#8D8478] mt-2">{new Date(thought.timestamp).toLocaleDateString()}</p>
    </div>
);


export const ReflectionView: React.FC<ReflectionViewProps> = ({ data, onClose }) => {
    return (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={onClose}>
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[80vh] overflow-y-auto p-8 relative" onClick={(e) => e.stopPropagation()}>
                <h2 className="text-2xl font-bold mb-2">Reflection Time</h2>
                <p className="text-sm text-[#8D8478] mb-6">Consider the connections between these past thoughts.</p>
                
                {data.isLoading ? (
                    <div className="space-y-4 animate-pulse">
                        <div className="h-20 bg-[#F7F2EB] rounded-lg"></div>
                        <div className="h-20 bg-[#F7F2EB] rounded-lg"></div>
                        <div className="h-10 bg-[#F7F2EB] rounded-lg mt-4"></div>
                    </div>
                ) : (
                    <>
                        <div className="space-y-4 mb-8 border-l-2 border-indigo-200 pl-4">
                            {data.thoughts.map(thought => <ReflectionThought key={thought.id} thought={thought} />)}
                        </div>
                        <div className="bg-indigo-50 border-l-4 border-indigo-400 p-4 rounded-r-lg">
                            <p className="text-lg font-medium text-indigo-900">{data.prompt}</p>
                        </div>
                    </>
                )}

                <button onClick={onClose} className="absolute top-4 right-4 p-2 rounded-full hover:bg-[#F7F2EB] text-[#8D8478]">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>
        </div>
    );
};
