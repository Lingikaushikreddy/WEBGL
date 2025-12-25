import { Canvas } from '@react-three/fiber';
import { Environment, Sky } from '@react-three/drei';
import { Suspense } from 'react';
import { Island } from './World/Island';
import { GuideBot } from './NPC/GuideBot';
import { Car } from './Game/Car';

export const Experience = () => {
    return (
        <Canvas shadows>
            <Suspense fallback={null}>
                <Sky sunPosition={[100, 20, 100]} />
                <Environment preset="city" />
                <group position={[0, -1, 0]}>
                    <Island />
                    <GuideBot />
                </group>
                <Car />
            </Suspense>
        </Canvas>
    );
};
