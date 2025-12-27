import { useGameStore } from '../Game/GameManager';

export const ProjectsModal = () => {
    const setModal = useGameStore((state) => state.setModal);

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <button className="close-button" onClick={() => setModal(null)}>X</button>
                <h2>Projects</h2>
                <div className="projects-grid">
                    <div className="project-card">
                        <h3>3D Game Engine</h3>
                        <p>A custom game engine built with C++ and Vulkan.</p>
                        <span className="tag">C++</span>
                        <span className="tag">Vulkan</span>
                    </div>
                    <div className="project-card">
                        <h3>Neural Network Vis</h3>
                        <p>Interactive visualization of neural networks.</p>
                        <span className="tag">Rust</span>
                        <span className="tag">WASM</span>
                    </div>
                    <div className="project-card">
                        <h3>Web Portfolio</h3>
                        <p>This website! Built with React Three Fiber.</p>
                        <span className="tag">React</span>
                        <span className="tag">WebGL</span>
                    </div>
                </div>
            </div>
        </div>
    );
};
