import { useGameStore } from '../Game/GameManager';

export const SkillsModal = () => {
    const setModal = useGameStore((state) => state.setModal);

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <button className="close-button" onClick={() => setModal(null)}>X</button>
                <h2>Skill Matrix</h2>
                <div className="skills-container">
                    <div className="skill-category">
                        <h3>Languages</h3>
                        <ul>
                            <li>Rust <span className="level">Expert</span></li>
                            <li>TypeScript <span className="level">Advanced</span></li>
                            <li>C++ <span className="level">Intermediate</span></li>
                            <li>Godot Script <span className="level">Expert</span></li>
                        </ul>
                    </div>
                    <div className="skill-category">
                        <h3>Technologies</h3>
                        <ul>
                            <li>React / Next.js</li>
                            <li>WebGL / Three.js</li>
                            <li>Docker / K8s</li>
                            <li>PostgreSQL</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};
