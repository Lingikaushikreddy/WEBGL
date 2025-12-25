import { useGameStore } from '../Game/GameManager';
import { useTexture } from '@react-three/drei';
import * as THREE from 'three';

export const Island = () => {
    const setDialogue = useGameStore((state) => state.setDialogue);

    // Load textures
    const textures = useTexture({
        map: '/assets/mjkv01j3.png',
        holo: '/assets/mjkuq6uf.png',
        sky: '/assets/mjkv44kq.png'
    });

    return (
        <group>
            {/* 360 Skybox Simulation */}
            <mesh scale={[100, 100, 100]}>
                <sphereGeometry />
                <meshBasicMaterial map={textures.sky} side={THREE.BackSide} />
            </mesh>

            {/* Main Ground */}
            <mesh rotation-x={-Math.PI / 2} receiveShadow>
                <circleGeometry args={[20, 32]} />
                <meshStandardMaterial color="#1a1a1a" roughness={0.2} metalness={0.8} />
            </mesh>

            {/* Decorative Grid */}
            <gridHelper args={[50, 50, 0x00ff88, 0x4a4a4a]} position={[0, 0.01, 0]} />

            {/* Projects Zone - Core Terminal */}
            <group position={[5, 2, 0]} rotation={[0, -Math.PI / 4, 0]}>
                <mesh
                    onClick={(e) => { e.stopPropagation(); setDialogue('project_zone'); }}
                    onPointerOver={() => { document.body.style.cursor = 'pointer'; }}
                    onPointerOut={() => { document.body.style.cursor = 'auto'; }}
                >
                    <planeGeometry args={[4, 3]} />
                    <meshBasicMaterial map={textures.map} side={THREE.DoubleSide} />
                </mesh>
                <mesh position={[0, -2, 0]} rotation={[-Math.PI / 2, 0, 0]}>
                    <cylinderGeometry args={[2, 2, 1, 32]} />
                    <meshStandardMaterial color="cyan" wireframe />
                </mesh>
            </group>

            {/* Skills Zone - Holo Display */}
            <group position={[-5, 2, 0]} rotation={[0, Math.PI / 4, 0]}>
                <mesh
                    onClick={(e) => { e.stopPropagation(); setDialogue('skill_zone'); }}
                    onPointerOver={() => { document.body.style.cursor = 'pointer'; }}
                    onPointerOut={() => { document.body.style.cursor = 'auto'; }}
                >
                    <planeGeometry args={[3, 4]} />
                    <meshBasicMaterial map={textures.holo} transparent opacity={0.9} side={THREE.DoubleSide} />
                </mesh>
                <mesh position={[0, -2.5, 0]}>
                    <boxGeometry args={[1, 1, 1]} />
                    <meshStandardMaterial color="orange" />
                </mesh>
            </group>
        </group>
    );
};
