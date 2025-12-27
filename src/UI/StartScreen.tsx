import { useGameStore } from '../Game/GameManager';

export const StartScreen = () => {
    const setPhase = useGameStore((state) => state.setPhase);
    const setDialogue = useGameStore((state) => state.setDialogue);

    const handleStart = () => {
        setPhase('playing');
        setDialogue('intro');
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content" style={{ textAlign: 'center', maxWidth: '500px' }}>
                <h1 style={{ color: 'var(--color-accent)', marginBottom: '1rem', fontSize: '3rem' }}>KAUSHIK OS</h1>
                <p style={{ marginBottom: '2rem', fontSize: '1.2rem', color: '#aaa' }}>
                    Neural Link Established. System Ready.
                </p>
                <div style={{ marginBottom: '2rem' }}>
                   <p>Navigate the island to explore my portfolio.</p>
                   <p style={{ fontSize: '0.9rem', color: '#666' }}>Controls: WASD + Space</p>
                </div>
                <button
                    onClick={handleStart}
                    style={{
                        fontSize: '1.5rem',
                        padding: '1rem 3rem',
                        border: '2px solid var(--color-accent)',
                        background: 'rgba(0, 255, 136, 0.1)'
                    }}
                >
                    INITIALIZE
                </button>
            </div>
        </div>
    );
};
