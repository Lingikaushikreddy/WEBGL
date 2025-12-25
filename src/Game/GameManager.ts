import { create } from 'zustand';

export type GamePhase = 'intro' | 'playing' | 'ending';

interface GameState {
    phase: GamePhase;
    inventory: string[];
    activeQuest: string | null;
    currentDialogue: string | null; // ID of the current dialogue node

    // Actions
    setPhase: (phase: GamePhase) => void;
    collectItem: (item: string) => void;
    startQuest: (quest: string) => void;
    setDialogue: (id: string | null) => void;
}

export const useGameStore = create<GameState>((set) => ({
    phase: 'intro',
    inventory: [],
    activeQuest: 'Find the Guide Bot',
    currentDialogue: 'intro',

    setPhase: (phase) => set({ phase }),
    collectItem: (item) => set((state) => {
        if (state.inventory.includes(item)) return state;
        return { inventory: [...state.inventory, item] };
    }),
    startQuest: (quest) => set({ activeQuest: quest }),
    setDialogue: (id) => set({ currentDialogue: id }),
}));
