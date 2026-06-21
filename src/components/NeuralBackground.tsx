"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const NODE_COUNT = 60;
const CONNECTION_DIST = 2.8;

function NeuralScene() {
  const groupRef = useRef<THREE.Group>(null);

  const { positions, linePositions } = useMemo(() => {
    const pos: THREE.Vector3[] = Array.from({ length: NODE_COUNT }, () =>
      new THREE.Vector3(
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 6,
        (Math.random() - 0.5) * 5
      )
    );

    const linePts: number[] = [];
    for (let i = 0; i < pos.length; i++) {
      for (let j = i + 1; j < pos.length; j++) {
        if (pos[i].distanceTo(pos[j]) < CONNECTION_DIST) {
          linePts.push(pos[i].x, pos[i].y, pos[i].z);
          linePts.push(pos[j].x, pos[j].y, pos[j].z);
        }
      }
    }

    return { positions: pos, linePositions: new Float32Array(linePts) };
  }, []);

  const pointsGeo = useMemo(() => {
    const g = new THREE.BufferGeometry();
    const pts = new Float32Array(positions.flatMap((p) => [p.x, p.y, p.z]));
    g.setAttribute("position", new THREE.BufferAttribute(pts, 3));
    return g;
  }, [positions]);

  const linesGeo = useMemo(() => {
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(linePositions, 3));
    return g;
  }, [linePositions]);

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.06;
      groupRef.current.rotation.x += delta * 0.02;
    }
  });

  return (
    <group ref={groupRef}>
      <points geometry={pointsGeo}>
        <pointsMaterial color="#edaac4" size={0.06} sizeAttenuation />
      </points>
      <lineSegments geometry={linesGeo}>
        <lineBasicMaterial color="#edaac4" transparent opacity={0.3} />
      </lineSegments>
    </group>
  );
}

export default function NeuralBackground() {
  return (
    <Canvas
      camera={{ position: [0, 0, 8], fov: 60 }}
      style={{ position: "absolute", inset: 0 }}
      gl={{ antialias: false, alpha: true }}
    >
      <NeuralScene />
    </Canvas>
  );
}
