import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Sidebar } from './components/Sidebar';
import { MainContent } from './components/MainContent';
import { RightPanel } from './components/RightPanel';
import { MobileHeader } from './components/MobileHeader';
import { LensView } from './components/LensView';
import { ReflectionView } from './components/ReflectionView';
import { Thought, List, AgentName } from './types';
import { AGENTS, LISTS } from './constants';
import { getThoughts, saveThoughts } from './services/storageService';
import { enrichThoughtWithAI, getClaritySummary, searchWithAI as performAiSearch, generateReflection, generateImage as generateImageFromYou } from './services/youcomService';

const App: React.FC = () => {
    const [thoughts, setThoughts] = useState<Thought[]>([]);
    const [lists] = useState<List[]>(LISTS);
    const [activeListId, setActiveListId] = useState<string>('all');
    const [selectedThought, setSelectedThought] = useState<Thought | null>(null);
    const [isAiThinking, setIsAiThinking] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const [searchTerm, setSearchTerm] = useState('');
    const [aiSearchResultIds, setAiSearchResultIds] = useState<string[] | null>(null);
    const [activeLens, setActiveLens] = useState<AgentName | null>(null);
    const [lensData, setLensData] = useState<{ summary: string; isLoading: boolean }>({ summary: '', isLoading: false });
    const [isReflectionMode, setIsReflectionMode] = useState(false);
    const [reflectionData, setReflectionData] = useState<{ thoughts: Thought[]; prompt: string; isLoading: boolean }>({ thoughts: [], prompt: '', isLoading: false });

    useEffect(() => {
        const loadedThoughts = getThoughts();
        if (loadedThoughts.length === 0) {
            const welcomeThought: Thought = {
                id: `thought-${Date.now()}`,
                timestamp: Date.now(),
                author: 'ai',
                agent: 'Lens',
                text: 'Welcome to Augment! What are you thinking about?',
                listId: 'visual',
                color: LISTS.find(l => l.id === 'visual')?.color || '#f87171',
            };
            setThoughts([welcomeThought]);
        } else {
            setThoughts(loadedThoughts);
        }
    }, []);

    const handleSaveThought = useCallback(async (text: string, image: string | null) => {
        if (!text.trim() && !image) return;

        const userThought: Thought = {
            id: `thought-${Date.now()}`,
            timestamp: Date.now(),
            author: 'user',
            text: text.trim(),
            imageUrl: image || undefined,
            listId: activeListId === 'all' ? 'visual' : activeListId,
            color: lists.find(l => l.id === (activeListId === 'all' ? 'visual' : activeListId))?.color || '#f87171',
        };

        const updatedThoughts = [...thoughts, userThought];
        setThoughts(updatedThoughts);
        saveThoughts(updatedThoughts);
        setIsAiThinking(true);

        try {
            const aiResponse = await enrichThoughtWithAI(userThought, thoughts.slice(-10));
            const aiThought: Thought = {
                id: `thought-${Date.now() + 1}`,
                timestamp: Date.now(),
                author: 'ai',
                agent: aiResponse.agent as AgentName,
                text: aiResponse.text,
                listId: aiResponse.listId,
                color: lists.find(l => l.id === aiResponse.listId)?.color || '#f87171',
                parentId: userThought.id,
            };
            const finalThoughts = [...updatedThoughts, aiThought];
            setThoughts(finalThoughts);
            saveThoughts(finalThoughts);
        } catch (error) {
            console.error("AI enrichment failed:", error);
        } finally {
            setIsAiThinking(false);
        }
    }, [activeListId, lists, thoughts]);

    const handleActivateLens = useCallback(async (lens: AgentName) => {
        if (lens !== 'Clarity') {
            alert(`${lens} lens coming soon!`);
            return;
        }
        setActiveLens('Clarity');
        setLensData({ summary: '', isLoading: true });
        try {
            const thoughtsInList = activeListId === 'all' ? thoughts : thoughts.filter(t => t.listId === activeListId);
            const summary = await getClaritySummary(thoughtsInList);
            setLensData({ summary, isLoading: false });
        } catch (error) {
            console.error("Failed to get lens summary:", error);
            setLensData({ summary: 'Could not generate summary.', isLoading: false });
        }
    }, [activeListId, thoughts]);

    const handleSearchWithAI = useCallback(async () => {
        if (!searchTerm.trim()) return;
        try {
            const resultIds = await performAiSearch(searchTerm, thoughts);
            setAiSearchResultIds(resultIds);
        } catch (error) {
            console.error("AI search failed:", error);
            alert("AI-powered search failed. Please try again.");
        }
    }, [searchTerm, thoughts]);

    const handleStartReflection = useCallback(async () => {
        setIsReflectionMode(true);
        setReflectionData({ thoughts: [], prompt: '', isLoading: true });
        try {
            const shuffled = [...thoughts].sort(() => 0.5 - Math.random());
            const selected = shuffled.slice(0, Math.min(3, thoughts.length));
            const reflectionPrompt = await generateReflection(selected);
            setReflectionData({ thoughts: selected, prompt: reflectionPrompt.prompt, isLoading: false });
        } catch (error) {
            console.error("Failed to generate reflection:", error);
            setReflectionData({ thoughts: [], prompt: 'Could not generate a reflection prompt.', isLoading: false });
        }
    }, [thoughts]);

    const handleGenerateImage = async (prompt: string): Promise<string | null> => {
        try {
            const base64Image = await generateImageFromYou(prompt);
            return `data:image/png;base64,${base64Image}`;
        } catch (error) {
            console.error("Failed to generate image in App:", error);
            alert("Image generation failed. Please try again.");
            return null;
        }
    };

    const scrollToThought = (thoughtId: string) => {
        document.getElementById(thoughtId)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    };

    const filteredThoughts = useMemo(() => {
        let result = thoughts;
        if (activeListId !== 'all') {
            result = result.filter(t => t.listId === activeListId);
        }
        if (aiSearchResultIds) {
            const idSet = new Set(aiSearchResultIds);
            result = result.filter(t => idSet.has(t.id));
        } else if (searchTerm) {
            result = result.filter(t => t.text?.toLowerCase().includes(searchTerm.toLowerCase()));
        }
        return result;
    }, [thoughts, activeListId, searchTerm, aiSearchResultIds]);
    
    const clearSearch = () => {
        setSearchTerm('');
        setAiSearchResultIds(null);
    }

    return (
        <div className="flex h-screen w-screen bg-[#FFFBF5] font-sans overflow-hidden">
            {activeLens && <LensView lens={activeLens} data={lensData} onClose={() => setActiveLens(null)} />}
            {isReflectionMode && <ReflectionView data={reflectionData} onClose={() => setIsReflectionMode(false)} />}
            
            <Sidebar
                lists={lists}
                agents={AGENTS}
                activeListId={activeListId}
                setActiveListId={setActiveListId}
                thoughtCount={thoughts.length}
                isOpen={isSidebarOpen}
                setIsOpen={setIsSidebarOpen}
                onActivateLens={handleActivateLens}
                onStartReflection={handleStartReflection}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                onSearchWithAI={handleSearchWithAI}
                onClearSearch={clearSearch}
            />
            <div className="flex flex-col flex-1 min-w-0">
                <MobileHeader onMenuClick={() => setIsSidebarOpen(true)} />
                <div className="flex flex-1 overflow-hidden">
                    <MainContent
                        thoughts={filteredThoughts}
                        onSaveThought={handleSaveThought}
                        isAiThinking={isAiThinking}
                        activeListId={activeListId}
                        lists={lists}
                        setSelectedThought={setSelectedThought}
                        onGenerateImage={handleGenerateImage}
                    />
                    <RightPanel 
                        thought={selectedThought} 
                        allThoughts={thoughts}
                        onConnectionClick={scrollToThought}
                    />
                </div>
            </div>
        </div>
    );
};

export default App;
