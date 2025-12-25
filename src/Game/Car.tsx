import { useRef, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { useKeyboardControls } from '@react-three/drei';
import * as THREE from 'three';
import { POI_LOCATIONS } from './Constants';
import { useGameStore } from './GameManager';

export const Car = () => {
    const groupRef = useRef<THREE.Group>(null);
    const [speed, setSpeed] = useState(0);
    // Removed unused steering state

    const MAX_SPEED = 0.8;
    const ACCELERATION = 0.01;
    const FRICTION = 0.98;
    const TURN_SPEED = 0.04;

    // Camera follow settings
    const cameraOffset = new THREE.Vector3(0, 5, 12);
    const cameraLookAtOffset = new THREE.Vector3(0, 0, 0);

    const [, getKeys] = useKeyboardControls();
    const { camera } = useThree();
    const { setInteractionPrompt, setDialogue, currentDialogue } = useGameStore();

    // Interaction Debounce
    const lastActionTime = useRef(0);

    useFrame((state) => {
        const { forward, backward, left, right, action } = getKeys();
        const group = groupRef.current;
        if (!group) return;

        // If dialogue is open, stop car and disable controls (optional, but good UX)
        if (currentDialogue) {
             setSpeed(0);
             return;
        }

        // Acceleration
        if (forward) {
            setSpeed((s) => Math.min(s + ACCELERATION, MAX_SPEED));
        } else if (backward) {
            setSpeed((s) => Math.max(s - ACCELERATION, -MAX_SPEED / 2));
        } else {
            setSpeed((s) => s * FRICTION);
        }

        // Steering
        if (Math.abs(speed) > 0.01) {
            if (left) {
                // setSteering((s) => s + TURN_SPEED);
                group.rotation.y += TURN_SPEED * Math.sign(speed);
            } else if (right) {
                // setSteering((s) => s - TURN_SPEED);
                group.rotation.y -= TURN_SPEED * Math.sign(speed);
            }
        }

        // Apply movement
        group.translateZ(speed);

        // Limit position to avoid falling off world (simple bounds)
        // const pos = group.position;
        // if (pos.length() > 100) {
        //     pos.setLength(100);
        // }

        // Camera Follow
        const idealOffset = cameraOffset.clone().applyQuaternion(group.quaternion);
        idealOffset.add(group.position);
        camera.position.lerp(idealOffset, 0.1);
        const targetLookAt = group.position.clone().add(cameraLookAtOffset);
        camera.lookAt(targetLookAt);

        // Check Interactions
        let activePrompt: string | null = null;

        // Check Projects
        if (group.position.distanceTo(POI_LOCATIONS.PROJECTS) < 8) {
            activePrompt = "Press SPACE to view Projects";
            if (action && state.clock.elapsedTime - lastActionTime.current > 1) {
                setDialogue('project_zone');
                lastActionTime.current = state.clock.elapsedTime;
            }
        }
        // Check Skills
        else if (group.position.distanceTo(POI_LOCATIONS.SKILLS) < 8) {
            activePrompt = "Press SPACE to view Skills";
            if (action && state.clock.elapsedTime - lastActionTime.current > 1) {
                setDialogue('skill_zone');
                lastActionTime.current = state.clock.elapsedTime;
            }
        }
        // Check Guide
        else if (group.position.distanceTo(POI_LOCATIONS.GUIDE) < 8) {
            activePrompt = "Press SPACE to talk to Guide";
            if (action && state.clock.elapsedTime - lastActionTime.current > 1) {
                setDialogue('intro');
                lastActionTime.current = state.clock.elapsedTime;
            }
        }

        setInteractionPrompt(activePrompt);
    });

    return (
        <group ref={groupRef} position={[0, 0.5, 0]}>
            {/* Car Body */}
            <mesh position={[0, 0.5, 0]} castShadow receiveShadow>
                <boxGeometry args={[1.5, 0.8, 3]} />
                <meshStandardMaterial color="#ff0055" metalness={0.6} roughness={0.2} />
            </mesh>

            {/* Cabin */}
            <mesh position={[0, 1.2, -0.5]} castShadow>
                <boxGeometry args={[1.2, 0.7, 1.5]} />
                <meshStandardMaterial color="#333" />
            </mesh>

            {/* Wheels */}
            <Wheel position={[-0.8, 0, 1]} />
            <Wheel position={[0.8, 0, 1]} />
            <Wheel position={[-0.8, 0, -1]} />
            <Wheel position={[0.8, 0, -1]} />
        </group>
    );
};

const Wheel = ({ position }: { position: [number, number, number] }) => {
    return (
        <mesh position={position} rotation={[0, 0, Math.PI / 2]} castShadow>
            <cylinderGeometry args={[0.4, 0.4, 0.3, 32]} />
            <meshStandardMaterial color="#111" />
        </mesh>
    );
};
