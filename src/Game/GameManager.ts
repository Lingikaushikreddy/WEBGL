import { create } from 'zustand';

export type GamePhase = 'intro' | 'playing' | 'ending';
export type ModalType = 'projects' | 'skills' | null;

interface GameState {
    phase: GamePhase;
    inventory: string[];
    activeQuest: string | null;
    currentDialogue: string | null; // ID of the current dialogue node
    interactionPrompt: string | null; // "Press Space to..."
    activeModal: ModalType;

    // Actions
    setPhase: (phase: GamePhase) => void;
    collectItem: (item: string) => void;
    startQuest: (quest: string) => void;
    setDialogue: (id: string | null) => void;
    setInteractionPrompt: (prompt: string | null) => void;
    setModal: (modal: ModalType) => void;
}

export const useGameStore = create<GameState>((set) => ({
    phase: 'intro',
    inventory: [],
    activeQuest: 'Find the Guide Bot',
    currentDialogue: null,
    interactionPrompt: null,
    activeModal: null,

    setPhase: (phase) => set({ phase }),
    collectItem: (item) => set((state) => {
        if (state.inventory.includes(item)) return state;
        return { inventory: [...state.inventory, item] };
    }),
    startQuest: (quest) => set({ activeQuest: quest }),
    setDialogue: (id) => set({ currentDialogue: id }),
    setInteractionPrompt: (prompt) => set({ interactionPrompt: prompt }),
    setModal: (modal) => set({ activeModal: modal }),
}));
