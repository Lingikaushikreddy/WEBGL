import { useGameStore } from '../Game/GameManager';
import { DIALOGUE_DATA } from '../Game/DialogueData';

export const Overlay = () => {
    const { currentDialogue, interactionPrompt, setPhase, setDialogue } = useGameStore();

    const handleAction = (action?: string) => {
        if (action === 'start_game') {
            setPhase('playing');
            setDialogue(null);
        } else if (action === 'close_dialogue') {
            setDialogue(null);
        }
    };

    const handleOption = (opt: { nextId?: string; action?: string }) => {
        if (opt.action) handleAction(opt.action);
        if (opt.nextId) setDialogue(opt.nextId);
    };

    const activeNode = currentDialogue ? DIALOGUE_DATA[currentDialogue] : null;

    return (
        <div className="ui-overlay">
            {/* Top HUD */}
            <header className="quest-log ui-interactive">
                <h3>STATUS</h3>
                <p>{activeNode ? 'IN CONVERSATION' : 'EXPLORING'}</p>
            </header>

            {/* Interaction Prompt */}
            {!activeNode && interactionPrompt && (
                <div style={{
                    position: 'absolute',
                    bottom: '10%',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    background: 'rgba(0, 0, 0, 0.7)',
                    padding: '1rem 2rem',
                    borderRadius: '2rem',
                    color: '#fff',
                    fontSize: '1.5rem',
                    fontWeight: 'bold',
                    pointerEvents: 'none',
                    border: '1px solid #00ff88'
                }}>
                    {interactionPrompt}
                </div>
            )}

            {/* Dialogue Box */}
            {activeNode && (
                <div style={{
                    position: 'absolute',
                    bottom: '20%',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    background: 'var(--color-ui-bg)',
                    padding: '2rem',
                    borderRadius: '1rem',
                    border: '2px solid var(--color-accent)',
                    textAlign: 'center',
                    maxWidth: '600px',
                    width: '90%'
                }} className="ui-interactive">
                    <h2 style={{ color: 'var(--color-accent)', marginBottom: '1rem' }}>{activeNode.id.toUpperCase()}</h2>
                    <p style={{ fontSize: '1.2rem', marginBottom: '2rem' }}>{activeNode.text}</p>
                    <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                        {activeNode.options.map((opt, i) => (
                            <button key={i} onClick={() => handleOption(opt)}>
                                {opt.label}
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {/* Controls Helper */}
            {!activeNode && (
                 <div style={{
                    position: 'absolute',
                    bottom: '2rem',
                    right: '2rem',
                    color: 'rgba(255,255,255,0.5)',
                    textAlign: 'right'
                }}>
                    <p>WASD / Arrows to Drive</p>
                    <p>SPACE to Interact</p>
                </div>
            )}
        </div>
    );
};
