import { DIALOGUE_DATA } from '../Game/DialogueData';
import { ProjectsModal } from './ProjectsModal';
import { SkillsModal } from './SkillsModal';
import { StartScreen } from './StartScreen';
import './Overlay.css';
import { useGameStore } from '../Game/GameManager';

export const Overlay = () => {
    const { currentDialogue, interactionPrompt, setPhase, setDialogue, setModal, activeModal, phase } = useGameStore();

    const handleAction = (action?: string) => {
        if (action === 'start_game') {
            setPhase('playing');
            setDialogue(null);
        } else if (action === 'close_dialogue') {
            setDialogue(null);
        } else if (action === 'open_projects') {
            setModal('projects');
            setDialogue(null);
        } else if (action === 'open_skills') {
            setModal('skills');
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
            {/* Start Screen */}
            {phase === 'intro' && <StartScreen />}

            {/* Modals */}
            {activeModal === 'projects' && <ProjectsModal />}
            {activeModal === 'skills' && <SkillsModal />}

            {/* Top HUD */}
            {phase !== 'intro' && (
            <header className="quest-log ui-interactive">
                <h3>STATUS</h3>
                <p>{activeNode ? 'IN CONVERSATION' : activeModal ? 'VIEWING DATA' : 'EXPLORING'}</p>
            </header>
            )}

            {/* Interaction Prompt */}
            {!activeNode && !activeModal && interactionPrompt && (
                <div className="interaction-prompt">
                    {interactionPrompt}
                </div>
            )}

            {/* Dialogue Box */}
            {activeNode && !activeModal && (
                <div className="dialogue-box ui-interactive">
                    <h2 className="dialogue-title">{activeNode.id.toUpperCase()}</h2>
                    <p className="dialogue-text">{activeNode.text}</p>
                    <div className="dialogue-options">
                        {activeNode.options.map((opt, i) => (
                            <button key={i} onClick={() => handleOption(opt)}>
                                {opt.label}
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {/* Controls Helper */}
            {!activeNode && !activeModal && (
                 <div className="controls-helper">
                    <p>WASD / Arrows to Drive</p>
                    <p>SPACE to Interact</p>
                </div>
            )}
        </div>
    );
};
