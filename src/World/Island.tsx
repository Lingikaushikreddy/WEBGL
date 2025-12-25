import { useTexture } from '@react-three/drei';
import * as THREE from 'three';
import { POI_LOCATIONS } from '../Game/Constants';

export const Island = () => {
    // Load textures
    const textures = useTexture({
        map: '/assets/mjkv01j3.png',
        holo: '/assets/mjkuq6uf.png',
        sky: '/assets/mjkv44kq.png'
    });

    return (
        <group>
            {/* 360 Skybox Simulation */}
            <mesh scale={[200, 200, 200]}>
                <sphereGeometry />
                <meshBasicMaterial map={textures.sky} side={THREE.BackSide} />
            </mesh>

            {/* Main Ground */}
            <mesh rotation-x={-Math.PI / 2} receiveShadow>
                <planeGeometry args={[200, 200]} />
                <meshStandardMaterial color="#1a1a1a" roughness={0.8} metalness={0.2} />
            </mesh>

            {/* Road Track */}
            <mesh rotation-x={-Math.PI / 2} position={[0, 0.05, 0]} receiveShadow>
                <ringGeometry args={[35, 55, 64]} />
                <meshStandardMaterial color="#333333" roughness={0.5} />
            </mesh>

            {/* Decorative Grid */}
            <gridHelper args={[200, 50, 0x00ff88, 0x222222]} position={[0, 0.02, 0]} />

            {/* Projects Zone - Core Terminal */}
            <group position={POI_LOCATIONS.PROJECTS.toArray()} rotation={[0, -Math.PI / 4, 0]}>
                <mesh position={[0, 2, 0]}>
                    <planeGeometry args={[8, 5]} />
                    <meshBasicMaterial map={textures.map} side={THREE.DoubleSide} />
                </mesh>
                <mesh position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]}>
                    <cylinderGeometry args={[3, 3, 0.5, 32]} />
                    <meshStandardMaterial color="cyan" wireframe />
                </mesh>
                {/* Visual Marker */}
                <mesh position={[0, 6, 0]}>
                     <octahedronGeometry args={[1]} />
                     <meshStandardMaterial color="cyan" emissive="cyan" emissiveIntensity={2} />
                </mesh>
            </group>

            {/* Skills Zone - Holo Display */}
            <group position={POI_LOCATIONS.SKILLS.toArray()} rotation={[0, Math.PI / 4, 0]}>
                <mesh position={[0, 2, 0]}>
                    <planeGeometry args={[6, 8]} />
                    <meshBasicMaterial map={textures.holo} transparent opacity={0.9} side={THREE.DoubleSide} />
                </mesh>
                <mesh position={[0, 0, 0]}>
                    <boxGeometry args={[4, 0.5, 4]} />
                    <meshStandardMaterial color="orange" />
                </mesh>
                 {/* Visual Marker */}
                 <mesh position={[0, 7, 0]}>
                     <octahedronGeometry args={[1]} />
                     <meshStandardMaterial color="orange" emissive="orange" emissiveIntensity={2} />
                </mesh>
            </group>
        </group>
    );
};
