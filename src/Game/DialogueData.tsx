export interface DialogueNode {
    id: string;
    text: string;
    options: { label: string; nextId?: string; action?: string }[];
}

export const DIALOGUE_DATA: Record<string, DialogueNode> = {
    'intro': {
        id: 'intro',
        text: "System Alert: Core Memory Corruption Detect... Oh, wait. It's just you, Traveler.",
        options: [
            { label: "Who are you?", nextId: 'intro_2' },
            { label: "Where am I?", nextId: 'intro_2' }
        ]
    },
    'intro_2': {
        id: 'intro_2',
        text: "I am the Guide Bot. We are on the Isle of Kaushik. The Resume Shards are scattered across the island.",
        options: [
            { label: "How do I fix it?", nextId: 'intro_3' }
        ]
    },
    'intro_3': {
        id: 'intro_3',
        text: "Explore the different zones. The Workbench holds 'Projects'. The Holograms hold 'Skills'. Go find them!",
        options: [
            { label: "Let's go!", action: 'start_game' }
        ]
    },
    'project_zone': {
        id: 'project_zone',
        text: "CORE TERMINAL ACCESS. Loading User Portfolio... [DETECTED]: 3D Simulation Engine, Rust-based Neural Nets, High-Performance WebGL Interfaces.",
        options: [
            { label: "View Details", action: 'open_projects' },
            { label: "Back", action: 'close_dialogue' }
        ]
    },
    'skill_zone': {
        id: 'skill_zone',
        text: "ARCHIVE [KAUSHIK]: Senior UI & Rust Developer. Expert in: React, WebGL, Rust, System Architecture. Status: AVAILABLE FOR HIRE.",
        options: [
            { label: "View Resume Data", action: 'open_skills' },
            { label: "Back", action: 'close_dialogue' }
        ]
    }
};
