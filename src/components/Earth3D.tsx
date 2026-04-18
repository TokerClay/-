
import React, { useRef, useMemo, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { OrbitControls, Stars, Text, Float } from '@react-three/drei';
import * as THREE from 'three';

interface Earth3DProps {
  rotationSpeed: number;
  autoRotate: boolean;
}

const Earth3D: React.FC<Earth3DProps> = ({ rotationSpeed, autoRotate }) => {
  const earthRef = useRef<THREE.Mesh>(null);
  const cloudsRef = useRef<THREE.Mesh>(null);
  const [clickedPoint, setClickedPoint] = useState<THREE.Vector3 | null>(null);

  // 地球材质
  const earthMaterial = useMemo(() => {
    const material = new THREE.MeshPhongMaterial({
      color: 0x1e90ff,
      emissive: 0x0a3a6a,
      shininess: 10,
      specular: 0x333333,
    });
    return material;
  }, []);

  // 云层材质
  const cloudsMaterial = useMemo(() => {
    const material = new THREE.MeshPhongMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.3,
      emissive: 0x111111,
    });
    return material;
  }, []);

  // 创建陆地凸起效果
  const earthGeometry = useMemo(() => {
    const geometry = new THREE.SphereGeometry(2, 64, 64);
    const position = geometry.attributes.position;
    const vertex = new THREE.Vector3();

    // 添加随机凸起模拟陆地
    for (let i = 0; i < position.count; i++) {
      vertex.fromBufferAttribute(position, i);
      const noise = Math.sin(vertex.x * 10) * Math.cos(vertex.y * 10) * Math.sin(vertex.z * 10) * 0.02;
      vertex.multiplyScalar(1 + noise);
      position.setXYZ(i, vertex.x, vertex.y, vertex.z);
    }

    position.needsUpdate = true;
    geometry.computeVertexNormals();
    return geometry;
  }, []);

  // 点击地球获取位置
  const handleClick = (event: any) => {
    event.stopPropagation();
    const point = event.point;
    setClickedPoint(point);
  };

  useFrame((state, delta) => {
    if (earthRef.current) {
      earthRef.current.rotation.y += delta * rotationSpeed;
    }
    if (cloudsRef.current) {
      cloudsRef.current.rotation.y += delta * rotationSpeed * 1.2;
    }
  });

  return (
    <>
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
      <OrbitControls 
        enablePan={false} 
        enableZoom={true} 
        enableRotate={true}
        autoRotate={autoRotate}
        autoRotateSpeed={rotationSpeed * 10}
      />
      
      {/* 环境光 */}
      <ambientLight intensity={0.2} />
      
      {/* 主光源（模拟太阳） */}
      <pointLight position={[10, 10, 10]} intensity={2} color="#ffcc66" />
      
      {/* 补光 */}
      <pointLight position={[-10, -10, -10]} intensity={0.3} color="#6699ff" />
      
      {/* 地球 */}
      <mesh 
        ref={earthRef} 
        geometry={earthGeometry}
        material={earthMaterial}
        onClick={handleClick}
      >
        {/* 大气发光效果 */}
        <meshStandardMaterial
          attach="material"
          color="#1e90ff"
          emissive="#0a2a4a"
          emissiveIntensity={0.3}
          metalness={0.1}
          roughness={0.6}
        />
      </mesh>
      
      {/* 云层 */}
      <mesh ref={cloudsRef} scale={[1.05, 1.05, 1.05]}>
        <sphereGeometry args={[2, 64, 64]} />
        <meshStandardMaterial
          attach="material"
          color="#ffffff"
          transparent
          opacity={0.4}
          metalness={0}
          roughness={1}
        />
      </mesh>
      
      {/* 发光大气层 */}
      <mesh scale={[1.1, 1.1, 1.1]}>
        <sphereGeometry args={[2, 64, 64]} />
        <meshBasicMaterial
          color="#4da6ff"
          transparent
          opacity={0.08}
          side={THREE.BackSide}
        />
      </mesh>

      {/* 点击标记 */}
      {clickedPoint && (
        <Float speed={2} rotationIntensity={0} floatIntensity={2}>
          <mesh position={clickedPoint.clone().multiplyScalar(1.1)}>
            <sphereGeometry args={[0.08, 16, 16]} />
            <meshBasicMaterial color="#ff6b6b" />
          </mesh>
          <Text
            position={clickedPoint.clone().multiplyScalar(1.25)}
            color="#ffffff"
            fontSize={0.2}
            anchorX="center"
            anchorY="middle"
          >
            已标记
          </Text>
        </Float>
      )}
    </>
  );
};

export default Earth3D;
