
import React, { useRef, useMemo, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { OrbitControls, Stars, Text, Float, Environment } from '@react-three/drei';
import * as THREE from 'three';
import { useLoader } from '@react-three/fiber';
import { TextureLoader } from 'three';

// 地球纹理贴图 URLs
const TEXTURES = {
  earthColor: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=high%20resolution%20earth%20texture%20map%20with%20land%20and%20ocean%20details&image_size=landscape_4_3',
  earthBump: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=earth%20bump%20map%20with%20topography%20details&image_size=landscape_4_3',
  earthSpecular: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=earth%20specular%20map%20with%20ocean%20reflection&image_size=landscape_4_3',
  clouds: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=earth%20clouds%20texture%20semi%20transparent&image_size=landscape_4_3'
};

interface Earth3DProps {
  rotationSpeed: number;
  autoRotate: boolean;
}

const Earth3D: React.FC<Earth3DProps> = ({ rotationSpeed, autoRotate }) => {
  const earthRef = useRef<THREE.Mesh>(null);
  const cloudsRef = useRef<THREE.Mesh>(null);
  const [clickedPoint, setClickedPoint] = useState<THREE.Vector3 | null>(null);

  // 加载地球纹理
  const [textures, setTextures] = useState<{
    earthColor: THREE.Texture | null;
    earthBump: THREE.Texture | null;
    earthSpecular: THREE.Texture | null;
    clouds: THREE.Texture | null;
  }>({
    earthColor: null,
    earthBump: null,
    earthSpecular: null,
    clouds: null
  });

  // 加载纹理贴图
  useEffect(() => {
    const textureLoader = new TextureLoader();
    
    Promise.all([
      textureLoader.loadAsync(TEXTURES.earthColor),
      textureLoader.loadAsync(TEXTURES.earthBump),
      textureLoader.loadAsync(TEXTURES.earthSpecular),
      textureLoader.loadAsync(TEXTURES.clouds)
    ]).then(([earthColor, earthBump, earthSpecular, clouds]) => {
      // 设置纹理参数
      earthColor.wrapS = THREE.RepeatWrapping;
      earthColor.wrapT = THREE.RepeatWrapping;
      earthBump.wrapS = THREE.RepeatWrapping;
      earthBump.wrapT = THREE.RepeatWrapping;
      earthSpecular.wrapS = THREE.RepeatWrapping;
      earthSpecular.wrapT = THREE.RepeatWrapping;
      clouds.wrapS = THREE.RepeatWrapping;
      clouds.wrapT = THREE.RepeatWrapping;
      
      setTextures({
        earthColor,
        earthBump,
        earthSpecular,
        clouds
      });
    });
  }, []);

  // 创建地球几何体
  const earthGeometry = useMemo(() => {
    return new THREE.SphereGeometry(2, 128, 128);
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
      <Stars radius={100} depth={50} count={10000} factor={4} saturation={0} fade speed={1} />
      <OrbitControls 
        enablePan={false} 
        enableZoom={true} 
        enableRotate={true}
        autoRotate={autoRotate}
        autoRotateSpeed={rotationSpeed * 10}
        minDistance={3}
        maxDistance={8}
      />
      
      {/* 环境光 */}
      <ambientLight intensity={0.2} color="#ffffff" />
      
      {/* 主光源（模拟太阳） */}
      <directionalLight 
        position={[10, 5, 10]} 
        intensity={2} 
        color="#ffffff" 
        castShadow
      />
      
      {/* 补光 */}
      <pointLight position={[-10, -10, -10]} intensity={0.3} color="#6699ff" />
      
      {/* 地球 */}
      <mesh 
        ref={earthRef} 
        geometry={earthGeometry}
        onClick={handleClick}
      >
        <meshPhongMaterial
          attach="material"
          map={textures.earthColor}
          bumpMap={textures.earthBump}
          bumpScale={0.05}
          specularMap={textures.earthSpecular}
          specular={new THREE.Color(0x333333)}
          shininess={30}
        />
      </mesh>
      
      {/* 云层 */}
      {textures.clouds && (
        <mesh ref={cloudsRef} scale={[1.02, 1.02, 1.02]}>
          <sphereGeometry args={[2, 128, 128]} />
          <meshPhongMaterial
            attach="material"
            map={textures.clouds}
            transparent
            opacity={0.5}
            depthWrite={false}
          />
        </mesh>
      )}
      
      {/* 发光大气层 */}
      <mesh scale={[1.1, 1.1, 1.1]}>
        <sphereGeometry args={[2, 128, 128]} />
        <meshBasicMaterial
          color="#4da6ff"
          transparent
          opacity={0.1}
          side={THREE.BackSide}
        />
      </mesh>
      
      {/* 臭氧层效果 */}
      <mesh scale={[1.15, 1.15, 1.15]}>
        <sphereGeometry args={[2, 64, 64]} />
        <meshBasicMaterial
          color="#00ffff"
          transparent
          opacity={0.03}
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
