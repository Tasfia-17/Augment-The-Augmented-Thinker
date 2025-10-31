import React from 'react';

export const HomeIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955a1.5 1.5 0 012.122 0l8.954 8.955M2.25 12V21h6V15h6v6h6V12M12 21V12" />
    </svg>
);

export const SettingsIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-1.007 1.11-.962a1.11 1.11 0 011.07 1.07c-.017.55-.522 1.02-1.07 1.07a1.11 1.11 0 01-1.11-.962z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
    </svg>
);

export const FeedbackIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v-7.5m0 0a6 6 0 00-6 6v1.5m6-7.5a6 6 0 016 6v1.5" />
    </svg>
);

export const PlusIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
    </svg>
);

export const SyncIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0011.664 0l3.181-3.183m-17.991 0l3.181-3.183a8.25 8.25 0 0111.664 0l3.181 3.183" />
    </svg>
);

// List Icons
const createColorIcon = (color: string): React.FC<{ className?: string }> => ({ className = 'w-4 h-4' }) => (
    <div className={`rounded-full ${className}`} style={{ backgroundColor: color }} />
);

export const VisualIcon = createColorIcon('#f87171');
export const ReadingIcon = createColorIcon('#60a5fa');
export const DistillIcon = createColorIcon('#a78bfa');
export const WritingIcon = createColorIcon('#fb923c');
export const GoalsIcon = createColorIcon('#facc15');
export const WineIcon = createColorIcon('#a3e635');
export const SimIcon = createColorIcon('#4ade80');
export const BadmintonIcon = createColorIcon('#34d399');
export const BiologyIcon = createColorIcon('#2dd4bf');
export const TeapotIcon = createColorIcon('#67e8f9');
export const FitnessIcon = createColorIcon('#818cf8');
export const AllIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => <div className={`rounded-full bg-[#A9A299] ${className}`} />;


export const CameraIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.776 48.776 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z" />
    </svg>
);

export const FolderIcon = (props: React.SVGProps<SVGSVGElement>) => (
     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0121.75 12v.75m-8.906-4.756a2.25 2.25 0 011.814-1.814M3 12.75h18M3 12.75a2.25 2.25 0 01-2.25-2.25V6a2.25 2.25 0 012.25-2.25h10.5a2.25 2.25 0 012.25 2.25v.75" />
    </svg>
);

export const Bars3Icon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
    </svg>
);

export const SparklesIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.898 20.622L16.5 21.75l-.398-1.128a3.375 3.375 0 00-2.455-2.456L12.75 18l1.128-.398a3.375 3.375 0 002.455-2.456L16.5 14.25l.398 1.128a3.375 3.375 0 002.456 2.456L20.25 18l-1.128.398a3.375 3.375 0 00-2.456 2.456z" />
    </svg>
);

export const BookOpenIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 003 9c-1.105 0-2 .9-2 2v3c0 1.1.895 2 2 2 1.104 0 2-.9 2-2v-1c0-1.1.896-2 2-2h1c.538 0 1.033.214 1.401.572.368.358.599.85.599 1.363V14c0 1.104.896 2 2 2s2-.896 2-2v-2.063c0-.513.231-1.005.599-1.363.368-.358.863-.572 1.401-.572h1c1.104 0 2 .896 2 2v1c0 1.1.896 2 2 2s2-.9 2-2v-3c0-1.1-.895-2-2-2a8.967 8.967 0 00-9-2.958z" />
    </svg>
);
