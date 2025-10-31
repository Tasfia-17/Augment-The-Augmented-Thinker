import React from 'react';
import { Bars3Icon } from './Icons';

interface MobileHeaderProps {
    onMenuClick: () => void;
}

export const MobileHeader: React.FC<MobileHeaderProps> = ({ onMenuClick }) => {
    return (
        <header className="md:hidden flex-shrink-0 flex items-center justify-between px-4 h-14 border-b border-[#EDE6DB] bg-white">
            <button onClick={onMenuClick} className="p-2 text-[#5A524A] rounded-md hover:bg-[#F7F2EB] focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500">
                <Bars3Icon className="w-6 h-6" />
            </button>
            <div className="font-semibold text-lg">Augment</div>
            <div className="w-8"></div>
        </header>
    );
};
