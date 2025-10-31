import React, { useState, useEffect } from 'react';
import { Thought } from '../types';
import { findConnections, researchTopic } from '../services/youcomService';

interface RightPanelProps {
    thought: Thought | null;
    allThoughts: Thought[];
    onConnectionClick: (thoughtId: string) => void;
}

interface ResearchResult {
    title: string;
    url: string;
    snippet: string;
}

const LinkPreview: React.FC<{ url: string }> = ({ url }) => {
    let domain = "Link";
    try { domain = new URL(url).hostname; } catch (e) {}

    return (
        <a href={url} target="_blank" rel="noopener noreferrer" className="block border border-[#EDE6DB] rounded-lg hover:bg-[#F7F2EB]/50 transition-colors">
            <div className="bg-[#F7F2EB] h-32 rounded-t-lg"></div>
            <div className="p-4">
                <p className="font-semibold text-[#332E27] truncate">Reflections and Context</p>
                <p className="text-sm text-[#8D8478] truncate">{domain}</p>
            </div>
        </a>
    )
}

const ConnectionItem: React.FC<{ thought: Thought; onClick: () => void }> = ({ thought, onClick }) => (
    <button onClick={onClick} className="w-full text-left p-3 rounded-lg hover:bg-[#F7F2EB] transition-colors">
        <p className="text-sm text-[#332E27] line-clamp-2">{thought.text || 'Image Thought'}</p>
        <p className="text-xs text-[#8D8478] mt-1">{new Date(thought.timestamp).toLocaleDateString()}</p>
    </button>
);


export const RightPanel: React.FC<RightPanelProps> = ({ thought, allThoughts, onConnectionClick }) => {
    const [connections, setConnections] = useState<Thought[]>([]);
    const [isLoadingConnections, setIsLoadingConnections] = useState(false);
    const [researchResults, setResearchResults] = useState<ResearchResult[]>([]);
    const [isResearching, setIsResearching] = useState(false);

    useEffect(() => {
        if (thought) {
            setResearchResults([]); // Clear research results when thought changes
            const fetchConnections = async () => {
                setIsLoadingConnections(true);
                setConnections([]);
                try {
                    const connectionIds = await findConnections(thought, allThoughts);
                    const foundConnections = allThoughts.filter(t => connectionIds.includes(t.id));
                    setConnections(foundConnections);
                } catch (error) {
                    console.error("Failed to fetch connections:", error);
                } finally {
                    setIsLoadingConnections(false);
                }
            };
            fetchConnections();
        }
    }, [thought, allThoughts]);

    const handleResearch = async () => {
        if (!thought || !thought.text?.trim()) return;
        setIsResearching(true);
        try {
            const response = await researchTopic(thought.text);
            setResearchResults(response.results || []);
        } catch (error) {
            console.error("Failed to fetch research:", error);
        } finally {
            setIsResearching(false);
        }
    };


    if (!thought) {
        return (
            <aside className="hidden lg:block w-96 flex-shrink-0 border-l border-[#EDE6DB] bg-white p-6">
                 <div className="flex flex-col items-center justify-center h-full text-center text-[#8D8478]">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.555 15.555a8.5 8.5 0 10-10.11 0m10.11 0l2.829 2.828m-12.939-2.828l-2.829 2.828" />
                    </svg>
                    <h3 className="text-lg font-semibold text-[#5A524A]">Select a thought</h3>
                    <p className="text-sm">Click on a thought in the timeline to see more details here.</p>
                </div>
            </aside>
        );
    }
    
    const linkInText = thought.text?.match(/https?:\/\/[^\s]+/);

    return (
        <aside className="hidden lg:block w-96 flex-shrink-0 border-l border-[#EDE6DB] bg-white p-6 overflow-y-auto">
            <div className="space-y-8">
                <div className="space-y-4 p-4 bg-[#F7F2EB]/50 rounded-lg">
                    <h3 className="text-sm font-semibold text-[#8D8478]">Metadata</h3>
                    <dl className="text-sm space-y-2">
                        <div className="flex justify-between"><dt className="text-[#5A524A]">Author</dt><dd className="font-medium capitalize">{thought.author}</dd></div>
                        {thought.agent && <div className="flex justify-between"><dt className="text-[#5A524A]">Agent</dt><dd className="font-medium">{thought.agent}</dd></div>}
                        <div className="flex justify-between"><dt className="text-[#5A524A]">Timestamp</dt><dd className="font-medium text-right">{new Date(thought.timestamp).toLocaleString()}</dd></div>
                    </dl>
                </div>

                {thought.text && <div><h3 className="text-sm font-semibold text-[#8D8478] mb-2">Content</h3><p className="text-base whitespace-pre-wrap">{thought.text}</p></div>}
                {thought.imageUrl && <div><h3 className="text-sm font-semibold text-[#8D8478] mb-2">Image</h3><img src={thought.imageUrl} alt="upload" className="mt-1 max-w-full rounded-lg border border-[#EDE6DB]" /></div>}
                {linkInText && <div><h3 className="text-sm font-semibold text-[#8D8478] mb-2">Enriched Context</h3><LinkPreview url={linkInText[0]} /></div>}
                
                <div>
                    <h3 className="text-sm font-semibold text-[#8D8478] mb-2">Web Context</h3>
                    {thought.text && (
                        <button onClick={handleResearch} disabled={isResearching} className="w-full mb-4 px-4 py-2 bg-indigo-100 text-indigo-700 font-semibold rounded-md hover:bg-indigo-200 active:bg-indigo-300 disabled:bg-gray-200 disabled:cursor-not-allowed transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-500">
                            {isResearching ? 'Researching...' : 'Research this Topic'}
                        </button>
                    )}
                    {isResearching ? (
                         <div className="text-sm text-[#8D8478] animate-pulse">Searching the web...</div>
                    ) : researchResults.length > 0 ? (
                        <div className="space-y-3">
                            {researchResults.map((result, index) => (
                                <a key={index} href={result.url} target="_blank" rel="noopener noreferrer" className="block p-3 rounded-lg border border-[#EDE6DB] hover:bg-[#F7F2EB] transition-colors">
                                    <p className="font-semibold text-sm text-indigo-600 truncate">{result.title}</p>
                                    <p className="text-sm text-[#5A524A] mt-1 line-clamp-2">{result.snippet}</p>
                                </a>
                            ))}
                        </div>
                    ) : (
                        <div className="text-sm text-[#8D8478]">Click the button to get web context for this thought.</div>
                    )}
                </div>

                <div>
                    <h3 className="text-sm font-semibold text-[#8D8478] mb-2">Connections</h3>
                    {isLoadingConnections ? (
                        <div className="text-sm text-[#8D8478] animate-pulse">Finding connections...</div>
                    ) : connections.length > 0 ? (
                        <div className="space-y-2">
                            {connections.map(conn => <ConnectionItem key={conn.id} thought={conn} onClick={() => onConnectionClick(conn.id)} />)}
                        </div>
                    ) : (
                        <div className="text-sm text-[#8D8478]">No connections found.</div>
                    )}
                </div>
            </div>
        </aside>
    );
};