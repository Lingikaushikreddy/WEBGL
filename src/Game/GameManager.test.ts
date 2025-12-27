import { describe, it, expect, beforeEach } from 'vitest';
import { useGameStore } from './GameManager';
import { act } from '@testing-library/react';

describe('GameManager', () => {
    beforeEach(() => {
        // Reset store before each test
        const { setPhase, setDialogue, setInteractionPrompt } = useGameStore.getState();
        act(() => {
            setPhase('intro');
            setDialogue(null);
            setInteractionPrompt(null);
            useGameStore.setState({ inventory: [], activeQuest: null });
        });
    });

    it('should have initial state', () => {
        const state = useGameStore.getState();
        expect(state.phase).toBe('intro');
        expect(state.inventory).toEqual([]);
    });

    it('should change phase', () => {
        act(() => {
            useGameStore.getState().setPhase('playing');
        });
        expect(useGameStore.getState().phase).toBe('playing');
    });

    it('should collect items', () => {
        act(() => {
            useGameStore.getState().collectItem('shard_1');
        });
        expect(useGameStore.getState().inventory).toContain('shard_1');

        // Should not duplicate
        act(() => {
            useGameStore.getState().collectItem('shard_1');
        });
        expect(useGameStore.getState().inventory).toHaveLength(1);
    });

    it('should set dialogue', () => {
        act(() => {
            useGameStore.getState().setDialogue('intro');
        });
        expect(useGameStore.getState().currentDialogue).toBe('intro');
    });
});
