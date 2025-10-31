import React from 'react';
import { AgentName } from '../types';

interface LensViewProps {
    lens: AgentName;
    data: { summary: string; isLoading: boolean };
    onClose: () => void;
}

export const LensView: React.FC<LensViewProps> = ({ lens, data, onClose }) => {
    return (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={onClose}>
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[80vh] overflow-y-auto p-8 relative" onClick={(e) => e.stopPropagation()}>
                <h2 className="text-2xl font-bold mb-2">Clarity Lens</h2>
                <p className="text-sm text-[#8D8478] mb-6">A summary of recurring themes in the current list.</p>
                {data.isLoading ? (
                    <div className="space-y-4 animate-pulse">
                        <div className="h-4 bg-[#F7F2EB] rounded w-3/4"></div>
                        <div className="h-4 bg-[#F7F2EB] rounded w-full"></div>
                        <div className="h-4 bg-[#F7F2EB] rounded w-5/6"></div>
                    </div>
                ) : (
                    <div className="prose prose-lg max-w-none text-[#332E27] whitespace-pre-wrap">
                        {data.summary}
                    </div>
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
