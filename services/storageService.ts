
import { Thought } from '../types';

const THOUGHTS_KEY = 'augment-thoughts';

export const getThoughts = (): Thought[] => {
    try {
        const thoughtsJSON = localStorage.getItem(THOUGHTS_KEY);
        if (thoughtsJSON) {
            return JSON.parse(thoughtsJSON);
        }
    } catch (error) {
        console.error("Failed to parse thoughts from localStorage", error);
    }
    return [];
};

export const saveThoughts = (thoughts: Thought[]): void => {
    try {
        const thoughtsJSON = JSON.stringify(thoughts);
        localStorage.setItem(THOUGHTS_KEY, thoughtsJSON);
    } catch (error) {
        console.error("Failed to save thoughts to localStorage", error);
    }
};
