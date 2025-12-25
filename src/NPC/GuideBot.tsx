import { useRef } from 'react';
import { Float, Text } from '@react-three/drei';
import { useGameStore } from '../Game/GameManager';
import { Mesh } from 'three';
import { POI_LOCATIONS } from '../Game/Constants';

export const GuideBot = () => {
    const meshRef = useRef<Mesh>(null);
    const activeQuest = useGameStore((state) => state.activeQuest);

    return (
        <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5} position={POI_LOCATIONS.GUIDE.toArray()}>
            <mesh
                ref={meshRef}
                castShadow
            >
                <sphereGeometry args={[0.5, 32, 32]} />
                <meshStandardMaterial color="#00ff88" roughness={0.2} metalness={0.8} />
            </mesh>

            {/* Holographic Ring */}
            <mesh rotation-x={Math.PI / 2} scale={[1.2, 1.2, 1.2]}>
                <ringGeometry args={[0.6, 0.7, 32]} />
                <meshBasicMaterial color="#00ff88" transparent opacity={0.5} />
            </mesh>

            <Text
                position={[0, 1, 0]}
                fontSize={0.3}
                color="white"
                anchorX="center"
                anchorY="middle"
                outlineWidth={0.02}
                outlineColor="#000000"
            >
                {activeQuest ? '!' : '?'}
            </Text>
        </Float>
    );
};
