import { Canvas } from '@react-three/fiber';
import { PointerLockControls, Environment, Sky } from '@react-three/drei';
import { Suspense } from 'react';
import { Island } from './World/Island';
import { GuideBot } from './NPC/GuideBot';
// import { useGameStore } from './Game/GameManager';

export const Experience = () => {
    // Game store usage future-poofing
    // const phase = useGameStore((state) => state.phase);

    return (
        <Canvas shadows camera={{ position: [0, 5, 10], fov: 50 }}>
            <Suspense fallback={null}>
                <Sky sunPosition={[100, 20, 100]} />
                <Environment preset="city" />
                <group position={[0, -1, 0]}>
                    <Island />
                    <GuideBot />
                </group>
                {/* Roaming Controls - Click to lock cursor, WASD to move (handled by R3F/three-stdlib default? No, just look for now) */}
                <PointerLockControls />
            </Suspense>
        </Canvas>
    );
};
